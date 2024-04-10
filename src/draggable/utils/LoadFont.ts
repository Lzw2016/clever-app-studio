interface FontConfig {
    /** 字体名称 */
    family: string;
    /** 字体文件url */
    srcUrl: string;
    /** 字体样式 */
    descriptors?: FontFaceDescriptors;
    /** 是否使用字体(默认使用) */
    useFont?: boolean;
}

interface LoadFontFaceInfo {
    /** 字体对象 */
    readonly fontFace: FontFace;
    /** 加载函数返回值 */
    readonly load: Promise<FontFace>;
}

// 已加载字体集合
const loadedFonts = new Map<string, LoadFontFaceInfo>();

/** 加载字体 */
async function loadFont(config: FontConfig): Promise<LoadFontFaceInfo> {
    let exists = loadedFonts.get(config.srcUrl);
    if (exists) return exists;
    const fontFace = new FontFace(config.family, `url(${config.srcUrl})`, config.descriptors);
    const loadFontFaceInfo: any = { fontFace: fontFace };
    loadedFonts.set(config.srcUrl, loadFontFaceInfo);
    try {
        loadFontFaceInfo.load = fontFace.load();
        await loadFontFaceInfo.load;
        if (config.useFont !== false) (document.fonts as any).add(fontFace);
    } catch (err) {
        loadedFonts.delete(config.srcUrl);
        console.error("加载字体失败，字体配置：", config);
        console.error(err);
    }
    return loadFontFaceInfo;
}

export type {
    FontConfig,
    LoadFontFaceInfo,
}

export {
    loadFont,
}
