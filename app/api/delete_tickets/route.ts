import prisma from '../../../lib/db'

export async function DELETE(request: Request) {
	const json = await request.json()
	await prisma.ticket.deleteMany({
		where: json
	}).catch(async (e) => {
		return Response.json({ message: "Deletion failed" })
	})

	return Response.json({ message: "Deletion succeeded" })
}
