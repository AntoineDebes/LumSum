interface ILimitOffset {
    limit: number;
    offset: number;
}

type TGetLimitOffset = (limit: number, offset: number) => ILimitOffset;
