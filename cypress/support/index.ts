export {};

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            /** Custom command to drag subject to target */
            // eslint-disable-next-line @typescript-eslint/method-signature-style
            drag(
                target: string,
                options?: Partial<TypeOptions>
            ): Chainable<Element>;
        }
    }
}
