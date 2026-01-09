
import { prismaClient } from "@repo/db/client";


export default async function Home() {
  const user = await prismaClient.users.findFirst();

  return (
    <div>
      <h1>Welcome</h1>
      {user && (
        <div>
          <p>Username: {user.username}</p>
          {/* Password should never be displayed on the frontend */}
        </div>
      )}
      <div>
        hi there
      </div>
    </div>
  );
}
