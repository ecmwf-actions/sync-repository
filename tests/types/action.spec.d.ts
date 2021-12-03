type ActionInput = {
    [key: string]: {
        description: string,
        required: boolean,
        default: string,
    },
};

type ActionStep = {
    if: string,
    shell: string,
    run: string,
};

type ActionMetadata = {
    inputs: Record<string, ActionInput>,
    runs: {
        using: 'composite' | 'docker' | 'node12',
        steps: ActionStep[],
    },
};
