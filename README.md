# React Context Store
This package allows to create a types React.Context for typescript user.

## Example
```typescript
    import { createContextStore } from '@youri-kane/react-context-store';

    const initState = {
        blabal: true,
    };
    const context = createContextStore<
        typeof initState, 
        | { type: "actionA"; payload: boolean }
        | { type: "actionB"; payload: undefined }
    >({
        initState: {
            blabal: true,
        },
        reducer: (state, action) => {
            switch (action.type) {
            case "actionA":
                return {
                ...state,
                blabal: action.payload,
                };
            case "actionB":
                return {
                ...state,
                blabal: false,
                };
            default:
                return state;
            }
        },
        namespace: "Test Store",
    });

    export const useTextContext = context.useStoreContext
    export const TestContextProvider = context.StoreProvider
    export const TestStoreConsumer = context.StoreConsumer
```