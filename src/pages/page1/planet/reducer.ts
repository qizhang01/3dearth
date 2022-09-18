export const INCREMENT_COUNT = 'increment'
export const DECREMENT_COUNT = 'decrement'

export const sub4Reducer = (
    state: { count: number },
    action: { type: 'increment' | 'decrement' }
) => {
    switch (action.type) {
        case INCREMENT_COUNT:
            return { count: state.count + 1 }
        case DECREMENT_COUNT:
            return { count: state.count - 1 }
        default:
            throw new Error()
    }
}
