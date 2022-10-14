/**
 * Manage an active index that needs to be contained or wrap.
 *
 * @example
 *
 * const {
 *   activeIndex,
 *   moveActiveIndex,
 * } = useRovingIndex({ maxIndex: items.length - 1 })
 */
export declare function useRovingIndex({ defaultIndex, maxIndex, type, }: {
    /** The default index used when first mounting. */
    defaultIndex?: number;
    /** Whether or not to contain the index. */
    contain?: boolean;
    /** The max index used to know when to contain or wrap. */
    maxIndex?: number;
    /** How to handle navigation when exceeding minimum and maximum indexes. */
    type?: 'contain' | 'wrap' | 'none';
}): {
    /** The active index. */
    activeIndex: number;
    /** The previously set index. */
    previousIndex: null | number;
    /** Whether the active index can be moved backward. */
    moveBackwardDisabled: boolean;
    /** Whether the active index can be moved forward. */
    moveForwardDisabled: boolean;
    /** Move the index backwards. */
    moveBackward: () => void;
    /** Move the index forwards. */
    moveForward: () => void;
    /** Move the active index by a positive or negative amount. */
    moveActiveIndex: (amount: number) => void;
    /** Set any active index. */
    setActiveIndex: (nextIndex: number) => void;
};
