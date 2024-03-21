'use client'

import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React from 'react'

const ViewMoreBtn = ({path}: {path: string}) => {
  const router = useRouter();
  return (
    <Button
      onPress={() => router.push(path)}
      className="text-white"
      variant="bordered"
    >
      View more
    </Button>
  );
}

export default ViewMoreBtn