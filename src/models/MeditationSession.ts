export default interface IMeditationSession{
    id: string, //todo: generate UUID
    dateMs: number,
    durationMs: number,
    notes: string, //description of how the meditation went
}