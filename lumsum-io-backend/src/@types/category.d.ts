import { FileHandle } from "fs/promises";

interface CategoryRes {
    id: string;
    name: string;
    imgUrl: string;
}

interface IAddCategory {
    id: string;
    name: string;
    desc: string;
    icon: string;
    banner: string;
    bannerMobile: string;
    bannerUrl: string;
    bannerActive: boolean;
    metaTitle: string;
    metaDesc: string;
    categoryText: string;
}

interface IUpdateCategory extends IAddCategory {
    id: string;
}

interface IRemoveCategory {
    id: string;
}
