// import Ext from 'extjs-classic';
// import numeral from 'numeral';
//
// // ------------------------------------------------------------------------------------------------- 数字相关
// // numeral -->  http://numeraljs.com/
// // big.js  -->  https://github.com/MikeMcl/big.js#readme
//
// /**
//  * 字符串转数字
//  * @param str 字符串
//  */
// const toNumber = (str: string) => {
//     return numeral(str).value();
// };
//
// /**
//  * 金额格式化，如：123,456,789.12
//  * @param val 金额数值
//  */
// const numberToMoney = (val: string) => {
//     return numeral(val).format("0,00.00");
// };
//
// /**
//  * 四舍五入取整数
//  * @param val 原始数字
//  */
// const numberRound = (val: number) => {
//     return toNumber(numeral(val).format("0"));
// };
//
// /**
//  * 格式化数字
//  * @param num 原始数字
//  * @param format 格式，如：0.000%、0,00.00
//  */
// const numberFormat = (num: number, format?: string) => {
//     if (!format) {
//         return `${num}`;
//     } else {
//         return numeral(num).format(format, Math.floor);
//     }
// };
//
// // ------------------------------------------------------------------------------------------------- 时间相关
// /*
//  Format      Description                                                               Example returned values
//  ------      -----------------------------------------------------------------------   -----------------------
//    d         一个月的哪一天，两位数字加前导零                                                01 to 31
//    D         一周中某一天的简短文本表示                                                     Mon to Sun
//    j         一个月中没有前导零的日期                                                       1 to 31
//    l         一周中某一天的完整文本表示                                                     Sunday to Saturday
//    N         ISO-8601星期几的数字表示                                                     1 (for Monday) through 7 (for Sunday)
//    S         一个月中日期的英文序数后缀，2个字符                                             st, nd, rd or th. Works well with j
//    w         星期几的数字表示                                                             0 (for Sunday) to 6 (for Saturday)
//    z         一年中的哪一天（从0开始）                                                      0 to 364 (365 in leap years)
//    W         ISO-8601年的周数，从周一开始的周数                                             01 to 53
//    F         一个月的完整文本表示，如一月或三月                                              January to December
//    m         月份的数字表示，以零开头                                                       01 to 12
//    M         一个月的简短文本表示                                                          Jan to Dec
//    n         月份的数字表示，不带前导零                                                     1 to 12
//    t         给定月份的天数                                                               28 to 31
//    L         是闰年                                                                     如果是闰年，则为1，否则为0。
//    o         ISO-8601年号（与（Y）相同，但如果ISO周号（W）                                   例如：1998年或2004年
//              属于上一年或下一年，则使用该年）
//    Y         一年的完整数字表示，4位数字                                                    例如：1999年或2003年
//    y         一年的两位数表示                                                             Examples: 99 or 03
//    a         小写上午或下午                                                               am or pm
//    A         大写上午或下午                                                               AM or PM
//    g         不带前导零的一小时的12小时格式                                                 1 to 12
//    G         不带前导零的小时的24小时格式                                                  0 to 23
//    h         带前导零的小时的12小时格式                                                    01 to 12
//    H         带前导零的小时的24小时格式                                                    00 to 23
//    i         分钟，带前导零                                                              00 to 59
//    s         秒，带前导零                                                                00 to 59
//    u         秒的小数                                                                   Examples:
//              （最少1位，允许任意位数）                                                      001（即0.001s）或
//                                                                                        100（即0.100s）或
//                                                                                        999（即0.999）或
//                                                                                        999876543210（即0.9998765443210）
//    O         与格林尼治标准时间（GMT）的时差（以小时和分钟为单位）                              Example: +1030
//    P         与格林尼治时间（GMT）的差异，冒号介于小时和分钟之间                                Example: -08:00
//    T         运行代码的机器的时区缩写                                                      Examples: EST, MDT, PDT ...
//    Z         时区偏移量（以秒为单位）（如果在UTC以西，则为负数，如果在UTC以东，则为正数）          -43200 to 50400
//    c         ISO 8601日期表示为当地时间，并附加UTC偏移量。
//              注意事项：
//              1) 如果未指定，则月/日默认为当前月/日，时间默认为午夜，而时区默认为浏览器的时区。       1991 or 1992-10 or 1993-09-20 or 1994-08-19T16:20+01:00 or 1995-07-18T17:21:28-02:00
//              如果指定了时间，则必须同时包括小时和分钟。“T”分隔符、秒、毫秒和时区是可选的。           1996-06-17T18:22:29.98765+03:00 or 1997-05-16T19:23:30,12345-0400 or 1998-04-15T20:24:31.2468Z
//              2) 如果指定，秒的小数部分必须至少包含1位数字（允许的最大数字数没有限制），             1999-03-14T20:24:32Z or 2000-02-13T21:25:33
//              并且可以用“”分隔或一个'，'                                                    2001-01-12 22:26:34 or 1962-06-17T09:21:34.125Z
//              有关支持的各种级别的日期-时间粒度，请参阅右侧的示例，
//              或参阅http://www.w3.org/TR/NOTE-datetime了解更多信息。
//    C         由本机date对象的（date.toISOString）方法实现的ISO日期字符串。
//              这将输出带有*UTC*小时和分钟值的数字部分，并通过附加“Z”时区标识符来指示这一点。
//    U         自Unix大纪元以来的秒数（1970年1月1日00:00:00 GMT）                             1193432466 or -2138434463
//    MS        Microsoft AJAX序列化日期                                                    Date(1238606590509) (i.e. UTC milliseconds since epoch) or Date(1238606590509+0800)
//    time      javascript毫秒时间戳                                                        1350024476440
//    timestamp UNIX时间戳（与U相同）                                                        1350024866
// */
// const dateFormatArray = [
//     'Y-m-d H:i:s',          // '2023-06-14 10:34:27'
//     'Y-m-d H:i',            // '2023-06-14 10:34'
//     'Y-m-d',                // '2023-06-14'
//     'Y/m/d H:i:s',          // '2023/06/14 10:36:23'
//     'Y/m/d H:i',            // '2023/06/14 10:34'
//     'Y/m/d',                // '2023/06/14'
//     'Ymd H:i:s',            // '20230614 10:37:19'
//     'Ymd H:i',              // '20230614 10:37'
//     'Ymd',                  // '20230614'
//     'Y.m.d H:i:s',          // '2023.06.14 10:37:19'
//     'Y.m.d H:i',            // '2023.06.14 10:37'
//     'Y.m.d',                // '2023.06.14'
//     'm-d-Y H:i:s',          // '06-14-2023 10:34:27'
//     'm-d-Y H:i',            // '06-14-2023 10:34'
//     'm-d-Y',                // '06-14-2023'
//     'm/d/Y H:i:s',          // '06/14/2023 10:34:27'
//     'm/d/Y H:i',            // '06/14/2023 10:34'
//     'm/d/Y',                // '06/14/2023'
//     'Y-m-d\\TH:i:sP',       // '2023-06-14T10:54:27+08:00'
//     'Y-m-d\\TH:i:s[P]',     // '2023-06-14T10:54:27+08:00'
//     'Y-m-d\\TH:i:s',        // '2023-06-14T10:59:47'
//     'Y-m-d\\TH:i:s.u',      // '2023-06-14T11:12:42.590'
//     'Y-m-d\\TH:i',          // '2023-06-14T10:59'
//     'H:i:s',                // '11:20:36'
//     'H:i:s.u',              // '11:20:49.538'
//     'H:i',                  // '11:21'
//     'Y-m',                  // '2023-06'
//     'Y-\\WW',               // '2023-W24'
//     'c',                    // '2023-06-14T10:54:27+08:00'
//     'C',                    // '2023-06-14T02:55:28.534Z'
// ];
//
// /**
//  * Date格式化
//  * @param date Date
//  * @param fmt 格式
//  */
// function dateFormat(date: Date, fmt: string = 'Y-m-d H:i:s'): string {
//     const str = Ext.util.Format.date(date, fmt);
//     if (str.includes("NaN") || str === '') {
//         return '-';
//     }
//     return str;
// }
//
// /**
//  * 对象转 Date
//  * @param obj 需要转换的值
//  * @param strict Ext.Date.parse 可选参数
//  */
// function toDate(obj: any, strict: boolean = false): Date | undefined {
//     const typeStr = Object.prototype.toString.call(obj);
//     let objStr = `${obj ?? ""}`;
//     switch (`${typeStr}`.toLowerCase()) {
//         case "[object string]":
//             break;
//         case "[object number]":
//             break;
//         case "[object array]":
//             objStr = (obj as Array<any>).join("-");
//             break;
//         case "[object date]":
//             return obj;
//     }
//     let date: Date | undefined;
//     date = Ext.Date.parse(objStr);
//     if (date) return date;
//     for (let format of dateFormatArray) {
//         date = Ext.Date.parse(objStr, format, strict);
//         if (date) return date;
//     }
//     return date;
// }
//
// export type DateUnit = 'y' | 'mo' | 'd' | 'h' | 'mi' | 's' | 'ms';
//
// /**
//  * 在一个时间上增加指定的时间
//  * @param date Date值
//  * @param unit 时间单位
//  * @param value 增加的时间值
//  * @param preventDstAdjust Ext.Date.add 可选参数
//  */
// function addDate(date: Date, unit: DateUnit, value: number, preventDstAdjust: boolean = false): Date {
//     return Ext.Date.add(date, unit, value, preventDstAdjust);
// }
//
// /**
//  * 用于将给定日期舍入到指定单位的开始时间
//  * @param date Date值
//  * @param unit 时间单位
//  * @param step 可选参数，用于指定对齐到单位的步长。默认值为1
//  */
// function alignDate(date: Date, unit: DateUnit, step: number = 1) {
//     return Ext.Date.align(date, unit, step);
// }
//
// /**
//  * 计算两个时间之间的差值
//  * @param min 开始时间
//  * @param max 结束时间
//  * @param unit 时间单位
//  */
// function diffDate(min: Date, max: Date, unit: DateUnit) {
//     return Ext.Date.diff(min, max, unit);
// }
//
// // ------------------------------------------------------------------------------------------------- 其他
// /**
//  * 把一个时间变成当前时间的距离时间，例如： N分钟前、N秒前、M年N分钟X秒前
//  * @param agoDate       时间Date对象
//  * @param level         需要显示的层级(默认1)
//  * @param maxTimeStamp  转换的最大时间差距(默认7天)
//  * @param timeUnit      时间单位数组，默认值 ["年", "个月", "天", "小时", "分钟", "秒"]
//  */
// const howLongAgo = (agoDate: Date, level?: number, maxTimeStamp?: number, timeUnit?: string[]): string => {
//     if (level === null || level === undefined) level = 1;
//     if (maxTimeStamp === null || maxTimeStamp === undefined) maxTimeStamp = 7 * 24 * 60 * 60 * 1000;
//     if (timeUnit === null || timeUnit === undefined) timeUnit = ["年", "个月", "天", "小时", "分钟", "秒"];
//     const byTime = [365 * 24 * 60 * 60 * 1000, 30 * 24 * 60 * 60 * 1000, 24 * 60 * 60 * 1000, 60 * 60 * 1000, 60 * 1000, 1000];
//     let ct = new Date().getTime() - toDate(agoDate).getTime();
//     const suffix = ct > 0 ? "前" : "后";
//     ct = ct < 0 ? -1 * ct : ct;
//     if (ct > maxTimeStamp) {
//         return dateFormat(agoDate);
//     }
//     const sb = [];
//     for (let i = 0; i < byTime.length; i++) {
//         if (ct < byTime[i]) {
//             continue;
//         }
//         const temp = Math.floor(ct / byTime[i]);
//         ct %= byTime[i];
//         if (temp > 0 && timeUnit[i]) {
//             sb.push(temp + timeUnit[i]);
//         }
//         // 一下控制最多输出几个时间单位：
//         // 一个时间单位如：N分钟前
//         // 两个时间单位如：M分钟N秒前
//         // 三个时间单位如：M年N分钟X秒前
//         // 以此类推
//         if (sb.length >= level) {
//             break;
//         }
//     }
//     if (sb.length <= 0) return "刚刚";
//     return `${sb.join("")}${suffix}`;
// };
//
// /**
//  * 时间毫秒数转成易读的时间，如：1ms、1s2ms、1m2s3ms
//  * @param time     时间毫秒数
//  * @param level    需要显示的层级(默认3)
//  * @param timeUnit 时间单位数组，默认值 ["Y", "M", "D", "h", "m", "s", "ms"]
//  */
// const howLong = (time: number, level?: number, timeUnit?: string[]): string => {
//     if (level === null || level === undefined) level = 3;
//     if (timeUnit === null || timeUnit === undefined) timeUnit = ["Y", "M", "D", "h", "m", "s", "ms"];
//     if (time === 0) return "0ms";
//     if (!time) return "-";
//     const byTime: number[] = [365 * 24 * 60 * 60 * 1000, 30 * 24 * 60 * 60 * 1000, 24 * 60 * 60 * 1000, 60 * 60 * 1000, 60 * 1000, 1000, 1];
//     const prefix = time >= 0 ? "" : "-";
//     let ct: number = time >= 0 ? time : time * -1;
//     const sb: string[] = [];
//     for (let i = 0; i < byTime.length; i++) {
//         if (ct < byTime[i]) {
//             continue;
//         }
//         const temp: number = Math.floor(ct / byTime[i]);
//         ct %= byTime[i];
//         if (temp > 0 && timeUnit[i]) {
//             sb.push(temp + timeUnit[i]);
//         }
//         // 一下控制最多输出几个层级：
//         // 一层如：1ms
//         // 二层如：1s2ms
//         // 三层如：1m2s3ms
//         // 以此类推
//         if (sb.length >= level) {
//             break;
//         }
//     }
//     return `${prefix}${sb.join("")}`;
// };
//
// const B: number = 8.0;
// const KB: number = B * 1024;
// const MB: number = KB * 1024;
// const GB: number = MB * 1024;
// const TB: number = GB * 1024;
// const BytesArray: { value: number; unit: string }[] = [
//     { value: TB, unit: "TB" },
//     { value: GB, unit: "GB" },
//     { value: MB, unit: "MB" },
//     { value: KB, unit: "KB" },
//     { value: B, unit: "B" },
// ];
// /**
//  * 比特大小转易读的数据大小格式，如：2.3MB
//  * @param num 数据比特大小bit(8bit=1b)
//  */
// const bytesFormat = (num: number): string => {
//     const prefix = num >= 0 ? "" : "-";
//     num = num >= 0 ? num : num * -1;
//     if (!num) return "-";
//     if (num === 0) return "0 B";
//     for (let i = 0; i < BytesArray.length; i++) {
//         const { value, unit } = BytesArray[i];
//         const result: number = num / value;
//         if (result >= 1.0) {
//             return `${prefix}${numeral(result).format("0,000.00")} ${unit}`;
//         }
//     }
//     return "-";
// };
//
// export default {
//     toNumber,
//     numberToMoney,
//     numberRound,
//     numberFormat,
//     dateFormat,
//     toDate,
//     addDate,
//     alignDate,
//     diffDate,
//     howLongAgo,
//     howLong,
//     bytesFormat,
// }
