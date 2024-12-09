import mixpanel from "mixpanel-browser";
mixpanel.init(process.env.MIXPANEL_KEY || "");

const env_check = true;
// let env_check = process.env.NODE_ENV === "production";

const actions = {
  identify: (id: string) => {
    if (env_check) mixpanel.identify(id);
  },
  alias: (id: string) => {
    if (env_check) mixpanel.alias(id);
  },
  track: (name: string, props?: any) => {
    if (env_check) mixpanel.track(name, props);
  },
  people: {
    set: (props: any) => {
      if (env_check) mixpanel.people.set(props);
    },
  },
};

export const Mixpanel = actions;
