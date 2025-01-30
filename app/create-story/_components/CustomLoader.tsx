"use client"

import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";
import Image from 'next/image';


function CustomLoader({isLoading}:any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  useEffect(()=>{
     onOpen();
  },[])

  return (
    <div className="flex items-center">
     {isLoading&& <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="mb-[70%] md:mb-0 lg:mb-0">
        <ModalContent>
          {(onClose) => (
            <>
           
              <ModalBody className="flex justify-center w-full items-center">
            <Image src={'/rating.gif'} alt={"loader"} width={300} height={300} className="w-[200px] h-[200px]"/>
            <h2 className="font-bold text-2xl text-primary text-center">
                 Please Wait.... 
            </h2>
              </ModalBody>
            
            </>
          )}
        </ModalContent>
      </Modal>}
    </div>
  );
}

export default CustomLoader;
