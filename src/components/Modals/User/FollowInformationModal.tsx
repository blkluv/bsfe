import {
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { SetStateAction } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { UserInformation } from "../../types/User";
import FollowItem from "../../user/FollowItem";
import { FollowingsFollowersModalType } from "../../user/Header";

type Props = {
  followInformationModalStateValue: FollowingsFollowersModalType;
  followInformationModalStateSetter: React.Dispatch<
    SetStateAction<FollowingsFollowersModalType>
  >;
  ostensibleUserInformation: UserInformation;
};

export default function FollowInformationModal({
  followInformationModalStateValue,
  followInformationModalStateSetter,
  ostensibleUserInformation,
}: Props) {
  return (
    <Modal
      id="followings-followers-modal"
      size={{
        base: "full",
        sm: "full",
        md: "md",
        lg: "md",
      }}
      isOpen={followInformationModalStateValue.isOpen}
      onClose={() =>
        followInformationModalStateSetter((prev) => ({
          ...prev,
          isOpen: false,
        }))
      }
      autoFocus={false}
    >
      <ModalOverlay backdropFilter="auto" backdropBlur="8px" />
      <ModalContent bg="black">
        <Flex
          position="sticky"
          top="0"
          px={6}
          align="center"
          justify="space-between"
          height="50px"
          bg="black"
        >
          <Flex textColor="white" fontSize="17pt" fontWeight="700" gap={2}>
            <Text> &ldquo;{ostensibleUserInformation.username}&ldquo;</Text>
            <Text>
              {followInformationModalStateValue.modal === "followings"
                ? "follows"
                : `${followInformationModalStateValue.modal}`}
            </Text>
          </Flex>

          <Icon
            as={AiOutlineClose}
            color="white"
            fontSize="15pt"
            cursor="pointer"
            onClick={() =>
              followInformationModalStateSetter((prev) => ({
                ...prev,
                isOpen: false,
              }))
            }
          />
        </Flex>

        <ModalBody>
          {/* <Stack gap={2}>
            {ostensibleUserInformation[
              followInformationModalStateValue.modal
            ].map((f) => (
              <FollowItem
                key={f}
                username={f}
                followingsFollowersModalStateSetter={
                  followInformationModalStateSetter
                }
              />
            ))}
          </Stack> */}
            <Stack gap={2}>
            {Array.from({ length: 100 }, (_, i) => (
              <Text color="white">Hello</Text>
            ))}
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
