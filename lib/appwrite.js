import { router } from "expo-router";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const {
  endpoint,
  platformId,
  projectId,
  databaseId,
  usersCollectionId,
  gigCollectionId,
  eventsCollectionId,
  baoughtGigCollectionId,
  ticketSailsCollectionId,
  storageBucketId,
} = {
  endpoint: "https://cloud.appwrite.io/v1",
  platformId: "com.achintha.marketplace",
  projectId: "678fd0d4000fa649ea86",
  databaseId: "678fd5480000bc77f75c",
  usersCollectionId: "678fd684002a99be395b",
  eventsCollectionId: "6791f48d0020179e91db",
  gigCollectionId: "6791f4990015a60b6b22",
  baoughtGigCollectionId: "679db2b5001a56ff3faf",
  ticketSailsCollectionId: "67a47b19003a110962f0",
  storageBucketId: "679dcc8a0023639313c8",
};

const client = new Client();

client.setEndpoint(endpoint).setProject(projectId).setPlatform(platformId);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async ({ email, password, username }) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw Error("user create error", Error);
    const avatarUrl = avatars.getInitials(username);
    // add sign in
    await signIn({ email, password });
    const newUser = await databases.createDocument(
      databaseId,
      usersCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error) {
    console.error("Sign up Error", error.message);
  }
};

export const signIn = async ({ email, password }) => {
  try {
    const sesstion = await account.createEmailPasswordSession(email, password);
    return sesstion;
  } catch (error) {
    if (
      error.message.includes("Invalid `email` param") ||
      error.message.includes("Please check the email and password.")
    ) {
      console.log("incorect info");
    } else {
      console.error("sign in error", error.message);
    }
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error("no user found", Error);
    if (!currentAccount.$id) throw Error("invalid account data missig id");
    const currentUser = await databases.listDocuments(
      databaseId,
      usersCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser || !Array.isArray(currentUser.documents)) {
      throw Error("no user found in db", Error);
    }

    return currentUser.documents[0];
  } catch (error) {
    if (error.message.includes("missing scope")) {
      console.log("User is not logged in. Redirecting to login page...");
    } else {
      console.error("Error fetching current user:", error.message);
    }
  }
};

// export const getCurrentUser = async () => {
//   try {
//     // Step 1: Fetch the current account
//     const currentAccount = await account.get();
//     console.log("Current Account:", currentAccount);

//     // Ensure currentAccount exists
//     if (!currentAccount) {
//       throw new Error("No user found");
//     }

//     // Ensure currentAccount has an $id property
//     if (!currentAccount.$id) {
//       throw new Error("Invalid account data: Missing $id");
//     }

//     // Step 2: Query the database for the user
//     const currentUser = await databases.listDocuments(
//       databaseId,
//       usersCollectionId,
//       [Query.equal("accountId", currentAccount.$id)]
//     );

//     // Ensure currentUser exists and has a documents array
//     if (!currentUser || !Array.isArray(currentUser.documents)) {
//       throw new Error("No user found in the database");
//     }

//     // Log the first document (if it exists)
//     console.log("First User Document:", currentUser.documents[0]);

//     // Return the first document
//     return currentUser.documents[0];
//   } catch (error) {
//     // Handle specific errors
//     if (error.message.includes("missing scope")) {
//       console.log("User is not logged in. Redirecting to login page...");
//     } else {
//       console.error("Error fetching current user:", error.message);
//     }
//   }
// };

export const signOut = async () => {
  try {
    const sesstion = await account.deleteSession("current");
    return sesstion;
  } catch (error) {
    console.error(error);
  }
};

export const getAllGigs = async () => {
  try {
    const gigs = await databases.listDocuments(databaseId, gigCollectionId);
    return gigs.documents;
  } catch (error) {
    console.error(error);
    throw Error(error.message);
  }
};

export const getAllEvents = async () => {
  try {
    const events = await databases.listDocuments(
      databaseId,
      eventsCollectionId
    );
    return events.documents;
  } catch (error) {
    console.error(error);
  }
};

export const getUserPosts = async (userId) => {
  try {
    const post = await databases.listDocuments(databaseId, gigCollectionId, [
      Query.equal("creator", userId),
    ]);
    return post.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserEvents = async (userId) => {
  try {
    const events = await databases.listDocuments(
      databaseId,
      eventsCollectionId,
      [Query.equal("organizer", userId)]
    );
    return events.documents;
  } catch (error) {
    console.log(error);
  }
};

export const buyGig = async ({
  date,
  price,
  buyerId,
  gigId,
  canceled,
  completed,
  securityCode,
}) => {
  try {
    await databases.createDocument(
      databaseId,
      baoughtGigCollectionId,
      ID.unique(),
      {
        date,
        price,
        buyerId,
        gigId,
        canceled,
        completed,
        securityCode,
      }
    );
  } catch (error) {
    console.log("Error placing order : ", error);
  }
};

export const getBookedDates = async (gigId) => {
  try {
    const orders = await databases.listDocuments(
      databaseId,
      baoughtGigCollectionId,
      [Query.equal("gigId", gigId)]
    );
    return orders.documents;
  } catch (error) {
    console.error("Error", error);
  }
};

export const getUserBookedGigs = async (userId) => {
  try {
    const result = await databases.listDocuments(
      databaseId,
      baoughtGigCollectionId,
      [Query.equal("buyerId", userId)]
    );
    return result.documents;
  } catch (error) {
    console.error(error);
  }
};

export const uploadFile = async (file, type) => {
  if (!file) return;

  const assets = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  };
  try {
    const uploadedFile = await storage.createFile(
      storageBucketId,
      ID.unique(),
      assets
    );
    console.log(uploadedFile);
    if (!uploadedFile) throw Error;

    const getFileUrl = await getFilePreviews(uploadedFile.$id, type);
    return getFileUrl;
  } catch (error) {
    console.log(error);
  }
};

export const getFilePreviews = async (fileId) => {
  try {
    const url = storage.getFilePreview(
      storageBucketId,
      fileId,
      2000,
      2000,
      "top",
      100
    );
    console.log("banner url", url);
    if (!url) throw Error;
    return url;
  } catch (error) {
    console.error("error getting url", error);
  }
};

export const createGig = async ({
  title,
  content,
  description,
  creator,
  prices,
  price_desc,
  gig_type,
  price_titles,
}) => {
  console.log(content);
  try {
    const [bannerImageUrl] = await Promise.all([uploadFile(content, "image")]);

    await databases.createDocument(databaseId, gigCollectionId, ID.unique(), {
      title,
      description,
      creator,
      prices,
      price_desc,
      price_titles,
      gig_type,
      content: bannerImageUrl,
    });
  } catch (error) {
    console.error("error creating gig", error);
  }
};

export const createEvent = async ({
  title,
  date,
  location,
  organizer,
  banner,
  ticket_count,
  prices,
  price_titles,
  event_desc,
}) => {
  try {
    const [bannerUrl] = await Promise.all([uploadFile(banner, "image")]);
    await databases.createDocument(
      databaseId,
      eventsCollectionId,
      ID.unique(),
      {
        eventname: title,
        banner: bannerUrl,
        date,
        location,
        organizer,
        ticket_count,
        prices,
        price_titles,
        event_desc,
      }
    );
  } catch (error) {
    console.error(error);
  }
};
