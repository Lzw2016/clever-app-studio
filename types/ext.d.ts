/**
 * 移除指定类型的所有只读属性并使其变为可写属性
 */
type MakeWritable<T> = {
    -readonly [P in keyof T]: T[P];
};
