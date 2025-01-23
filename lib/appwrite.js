import { router } from "expo-router";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

export const {
  endpoint,
  platformId,
  projectId,
  databaseId,
  usersCollectionId,
} = {
  endpoint: "https://cloud.appwrite.io/v1",
  platformId: "com.achintha.marketplace",
  projectId: "678fd0d4000fa649ea86",
  databaseId: "678fd5480000bc77f75c",
  usersCollectionId: "678fd684002a99be395b",
};

const client = new Client();

client.setEndpoint(endpoint).setProject(projectId).setPlatform(platformId);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

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
    console.error("sign in error", error.message);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error("no user found", Error);
    const currentUser = await databases.listDocuments(
      databaseId,
      usersCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw Error("no user found in db", Error);
    return currentUser.documents[0];
  } catch (error) {
    if (error.message.includes("missing scope")) {
      console.log("User is not logged in. Redirecting to login page...");
    } else {
      console.error("Error fetching current user:", error.message);
    }
  }
};

export const signOut = async () => {
  try {
    const sesstion = await account.deleteSession("current");
    return sesstion;
  } catch (error) {
    console.error(error);
  }
};
