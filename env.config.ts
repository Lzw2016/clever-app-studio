import lodash from "lodash";

const defEnv: EnvConfig = {
    serverHost: '0.0.0.0',
    serverPort: 3000,
    apiTarget: 'http://127.0.0.0:8080',
    htmlTitle: 'vue3',
};

const allEnv: Record<string, Partial<EnvConfig>> = {
    development: {
        htmlTitle: 'dev',
    },
    production: {
        htmlTitle: 'prod',
    },
};

for (const key in allEnv) {
    const config = allEnv[key];
    allEnv[key] = lodash.defaultsDeep(config, defEnv);
}

export default allEnv as Record<string, EnvConfig>;
