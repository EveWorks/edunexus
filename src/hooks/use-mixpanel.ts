import { useCallback } from "react";
import mixpanel from "mixpanel-browser";

const mixpanelKey = process.env.NEXT_PUBLIC_MIXPANEL_KEY;
if (!mixpanelKey) {
  console.error("Mixpanel key is not defined!");
} else {
  mixpanel.init(mixpanelKey, { debug: true });
  console.log("Mixpanel initialized!");
}

interface MixpanelActions {
  identify: (id: string) => void;
  alias: (id: string) => void;
  track: (name: string, properties?: any) => void;
  people: {
    set: (props: Record<string, any>) => void;
  };
}

const useMixpanel = (): MixpanelActions => {
  // const envCheck = process.env.NODE_ENV === "production";
  const envCheck = true;

  const identify = useCallback(
    (id: string) => {
      if (envCheck) {
        mixpanel.identify(id);
      }
    },
    [envCheck]
  );

  const alias = useCallback(
    (id: string) => {
      if (envCheck) {
        mixpanel.alias(id);
      }
    },
    [envCheck]
  );

  const track = useCallback(
    (name: string, properties: any = {}) => {
      if (envCheck) {
        mixpanel.track(name, properties);
      }
    },
    [envCheck]
  );

  const setPeople = useCallback(
    (props: Record<string, any>) => {
      if (envCheck) {
        mixpanel.people.set(props);
      }
    },
    [envCheck]
  );

  return {
    identify,
    alias,
    track,
    people: {
      set: setPeople,
    },
  };
};

export default useMixpanel;
