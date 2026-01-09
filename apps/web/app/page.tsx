
import { prismaClient } from "@repo/db/client";


export default async function Home() {
  const user = await prismaClient.users.findFirst();

  return (
    <div>
      {user?.username}
      {user?.password}
      <br />
      <div>
        hi there tu kuch ni dekhya han diye je jatt ni dekhya
      </div>
    </div>
  );
}
