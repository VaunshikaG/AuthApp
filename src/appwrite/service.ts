import { ID, Account, Client } from 'appwrite';
// import Config from 'react-native-config';
import Snackbar from 'react-native-snackbar';

const appwriteClient = new Client()

// const APPWRITE_ENDPOINT: string = Config.APPWRITE_ENDPOINT!;
// const APPWRITE_PROJECT_ID: string = Config.APPWRITE_PROJECT_ID!;

const APPWRITE_ENDPOINT: string = 'https://fra.cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID: string = '686f88c500260fb7913b';

type CreateUserAccount = {
    email: string;
    password: string;
    name: string;
}

type LoginUserAccount = {
    email: string;
    password: string;
}

class AppwriteService {
    // using constructor
    account;
    constructor() {
        appwriteClient
            .setEndpoint(APPWRITE_ENDPOINT)
            .setProject(APPWRITE_PROJECT_ID);

        this.account = new Account(appwriteClient);
    }

    // create new record of user inside appwrite
    async createAccount({ email, password, name }: CreateUserAccount) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name,
            );

            if (userAccount) {
                return this.login({email, password});
            } else {
                return userAccount;
            }

        } catch (error) {
            Snackbar.show({
                text: String(error),
                duration: Snackbar.LENGTH_LONG
            })
            console.log("appwrite service :: createAccount() :: " + error);
        }
    }

    // login
    async login({ email, password }: LoginUserAccount) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            Snackbar.show({
                text: String(error),
                duration: Snackbar.LENGTH_LONG
            })
            console.log("appwrite service :: login() :: " + error);
        }
    }

    // get user details
    async getUser() {
        try {
            return await this.account.get();
        } catch (error) {
            Snackbar.show({
                text: String(error),
                duration: Snackbar.LENGTH_LONG
            })
            console.log("appwrite service :: login() :: " + error);
        }
    }

    // logout
    async logout() {
        try {
            return await this.account.deleteSession('current')
        } catch (error) {
         Snackbar.show({
                text: String(error),
                duration: Snackbar.LENGTH_LONG
            })
            console.log("appwrite service :: logout() :: " + error);   
        }
    }
}

export default AppwriteService;