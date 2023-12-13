-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "user_emails" TEXT[],
    "agent_emails" TEXT[],
    "body" TEXT NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL,
    "date_modified" TIMESTAMP(3) NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "subject" TEXT NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);
