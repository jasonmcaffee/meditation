import IMeditationSession from "../models/MeditationSession";
import fileSystem from "../services/fileSystem";
import IDataContainer from "../models/DataContainer";
import RNFS from "react-native-fs";

const sessionsDataFilePath = RNFS.DocumentDirectoryPath + '/sessions.txt';

class MeditationSessionRepository {
    async getMeditationSessions(): Promise<IMeditationSession[]>{
        const dataContainer = await this.getDataContainer();
        const meditationSessions = dataContainer.meditationSessions.map(convertDataStringToMeditationSession);
        return meditationSessions;
    }

    async getDataContainer(){
        let dataString = await ensureSessionsFileExists(async ()=>{
            return await fileSystem.readFile(sessionsDataFilePath);
        });

        // try{
        //     dataString = await fileSystem.readFile(sessionsDataFilePath);
        // }catch(e){
        //     console.log(e);
        //     // @ts-ignore
        //     if(e.message.indexOf('no such file or directory') >= 0){
        //         console.log(`file doesn't exist.`)
        //         const dataContainer: IDataContainer = {
        //             meditationSessions: [],
        //         }
        //         dataString = JSON.stringify(dataContainer);
        //         await fileSystem.writeFile(dataString, sessionsDataFilePath);
        //     }else{
        //         throw e;
        //     }
        // }

        const dataContainer = convertDataStringToDataContainer(dataString);
        return dataContainer;
    }

    async saveMeditationSession(meditationSession: IMeditationSession){
        const dataContainer = await this.getDataContainer();
        const meditationSessionString = JSON.stringify(meditationSession);
        dataContainer.meditationSessions.push(meditationSessionString);
        await this.saveDataContainer(dataContainer);
    }

    async saveDataContainer(dataContainer: IDataContainer){
        const dataContainerString = JSON.stringify(dataContainer);
        await fileSystem.writeFile(dataContainerString, sessionsDataFilePath);
    }
}

async function ensureSessionsFileExists(func: ()=> Promise<string> ){
    try{
        return await func();
    }catch(e){
        //@ts-ignore
        if(e.message.indexOf('no such file or directory') >= 0){
            console.log(`file doesn't exist.`)
            const dataContainer: IDataContainer = {
                meditationSessions: [],
            }
            const dataString = JSON.stringify(dataContainer);
            await fileSystem.writeFile(dataString, sessionsDataFilePath);
            return dataString;
        }else{
            throw e;
        }
    }
}


function convertDataStringToDataContainer(dataString: string): IDataContainer{
    const dataContainer = JSON.parse(dataString) as IDataContainer;
    return dataContainer;
}

function convertDataStringToMeditationSession(dataString: string): IMeditationSession{
    const meditationSession = JSON.parse(dataString) as IMeditationSession;
    return meditationSession;
}
const meditationSessionRepository = new MeditationSessionRepository();
export default meditationSessionRepository;