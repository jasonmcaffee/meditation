import IMeditationSession from "../models/IMeditationSession";
import meditationSessionRepository from "../repository/meditationSessionRepository";

class MeditationSession{
    async getMeditationSessions() : Promise<IMeditationSession[]>{
        return meditationSessionRepository.getMeditationSessions();
    }

    /**
     * Save new or update existing.
     * @param meditationSession
     */
    async saveMeditationSession(meditationSession: IMeditationSession){
        return meditationSessionRepository.saveMeditationSession(meditationSession);
    }

    async createAndSaveMeditationSession(durationMs: number, notes: string, dateMs = Date.now()){
        const session: IMeditationSession = {
            id: Date.now().toString(),
            durationMs,
            notes,
            dateMs,
        };
        await this.saveMeditationSession(session);
        return session;
    }

    async deleteMeditationSession(meditationSession: IMeditationSession){
        return meditationSessionRepository.deleteMeditationSession(meditationSession);
    }

}

const meditationSession = new MeditationSession();
export default meditationSession;