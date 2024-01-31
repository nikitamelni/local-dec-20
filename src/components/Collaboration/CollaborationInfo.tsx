import React from 'react';
import { RoomProvider, useOthers } from '../../../liveblocks.config';
import { useRouter } from 'next/router';
import { useUniformCurrentComposition } from '@uniformdev/canvas-react';

function Example() {
  const users = useOthers();

  return (
    <div className="fixed top-0 left-0 w-full p-2 text-center">
      {users.length ? (
        <h3 className="text-red-500">Someone is editing this page</h3>
      ) : (
        <h3 className="text-green-500">No one is editing this page</h3>
      )}
    </div>
  );
}

export default function CollaborationInfo() {
  const { asPath } = useRouter();

  const roomId = asPath.replaceAll('/', '_s_').replaceAll('=', '_e_').replaceAll('?', '_q_');

  const { isContextualEditing } = useUniformCurrentComposition();
  return (
    <>
      {isContextualEditing && (
        <div className="w-12 h-12">
          <RoomProvider id={roomId} initialPresence={{}}>
            <Example />
          </RoomProvider>
        </div>
      )}
    </>
  );
}
