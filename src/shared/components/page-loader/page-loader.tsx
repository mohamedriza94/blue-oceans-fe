import { Image, Loader, Overlay, Stack, Transition } from "@mantine/core";
import { useRouteProgress } from "./use-route-progress";
import { logos } from "@/shared/constants/general";

export const PageLoader = () => {
  const isRouting = useRouteProgress();

  return (
    <Transition
      mounted={isRouting}
      transition="fade"
      duration={200}
      timingFunction="ease-in-out"
    >
      {(transitionStyles) => (
        <Overlay
          style={{
            ...transitionStyles,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          backgroundOpacity={0}
          blur={6}
          h={"100vh"}
          pos={"fixed"}
          w={"100vw"}
        >
          <Stack
            align="center"
            justify="center"
            gap="1"
            pt="xl"
            pb="xs"
            px="xl"
            bg="rgba(255, 255, 255, 0.7)"
            style={{
              borderRadius: "1.5rem",
              boxShadow: "10px 10px 145px -14px rgba(0, 0, 0, 0.75)",
              WebkitBoxShadow: "10px 10px 145px -14px rgba(0, 0, 0, 0.75)",
              MozBoxShadow: "10px 10px 145px -14px rgba(0, 0, 0, 0.75)",
            }}
          >
            <Image w={30} src={logos.symbolOnlyTransparent} />
            <Loader color="amaranthRed.5" size="xl" type="dots" />
          </Stack>
        </Overlay>
      )}
    </Transition>
  );
};
