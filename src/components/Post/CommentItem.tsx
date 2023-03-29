import { firestore } from "@/firebase/clientApp";
import { Flex, Icon, Text, Image, SkeletonCircle } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { CommentData } from "../types/Post";

type Props = {
  commentData: CommentData;
};

export default function CommentItem({ commentData }: Props) {
  const [commentSenderPhoto, setCommentSenderPhoto] = useState("");
  const [gettingCommentSenderPhoto, setGettingCommentSenderPhoto] =
    useState(false);

  const router = useRouter();

  useEffect(() => {
    getPostSenderPhoto();
  }, [commentData]);

  const getPostSenderPhoto = async () => {
    setGettingCommentSenderPhoto(true);
    const commentSenderDocRef = doc(
      firestore,
      `users/${commentData.commentSenderUsername}`
    );
    const commentDocSnapshot = await getDoc(commentSenderDocRef);
    if (commentDocSnapshot.exists()) {
      setCommentSenderPhoto(commentDocSnapshot.data().profilePhoto);
    }
    setGettingCommentSenderPhoto(false);
  };

  return (
    <Flex height="50px" align="center" gap={2}>
      <Image
        src={commentSenderPhoto}
        rounded="full"
        width="35px"
        height="35px"
        fallback={
          !!commentSenderPhoto || gettingCommentSenderPhoto ? (
            <SkeletonCircle
              width="35px"
              height="35px"
              startColor="gray.100"
              endColor="gray.800"
            />
          ) : (
            <Icon as={CgProfile} color="white" height="35px" width="35px" />
          )
        }
        cursor="pointer"
        onClick={() =>
          router.push(`/users/${commentData.commentSenderUsername}`)
        }
      />

      <Flex direction="column">
        <Text fontSize="10pt" textColor="white" as="b">
          {commentData.commentSenderUsername}
        </Text>
        <Text fontSize="10pt" textColor="white">
          {commentData.comment}
        </Text>
      </Flex>
    </Flex>
  );
}