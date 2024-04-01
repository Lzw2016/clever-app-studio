type DictId = string | number | boolean;
type DictText = string | number | boolean;

interface DictItem {
    /** 数据值 */
    id: DictId;
    /** 数据显示值 */
    text: DictText;

    [key: string]: any;
}

type DictArray = DictItem[];

/** 读取所有的字典数据 */
type GetAllDict = () => Promise<Map<string, DictArray>>;

/** 读取字典数据 */
type GetDict = (dictName: string) => Promise<DictArray>;
