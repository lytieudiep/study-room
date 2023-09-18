import StudyRoomPrismaClient from "./db";

export async function userIsParticipant(roomId: number, userId: number): Promise<boolean> {
    const participant = await StudyRoomPrismaClient.participant.findFirst({
        where: {
            userId: userId,
            roomId: roomId
        }
    });
    return participant ? true : false;
}