// 1-6位：表示行政区划的代码
// 1、2位，所在省（直辖市，自治区）代码
// 3、4位，所在地级市（自治州）代码
// 5、6位，所在区（县，自治县，县级市）的代码
// 7-14位：表示出生年、月、日
// 15-16位：所在地派出所代码
// 17位：性别。奇数（1、3、5、7、9）男性，偶数（2、4、6、8、0）女性
// 18位：校验位，存在十一个值：0,1,2,3,4,5,6,7,8,9,X，其值是用固定公式根据前面十七位计算出来的。
const checkId = (id) => {
    // 校验所在省（直辖市，自治区）代码
    const checkProv = (prov) => {
        const provs = {
            11:'北京',
            12:'天津',
            13:'河北',
            14:'山西',
            15:'内蒙古',
            21:'辽宁',
            22:'吉林',
            23:'黑龙江',
            31:'上海',
            32:'江苏',
            33:'浙江',
            34:'安徽',
            35:'福建',
            36:'江西',
            37:'山东',
            41:'河南',
            42:'湖北',
            43:'湖南',
            44:'广东',
            45:'广西',
            46:'海南',
            50:'重庆',
            51:'四川',
            52:'贵州',
            53:'云南',
            54:'西藏',
            61:'陕西',
            62:'甘肃',
            63:'青海',
            64:'宁夏',
            65:'新疆',
            71:'台湾',
            81:'香港',
            82:'澳门',
            91:'国外'
        };
        if (provs[prov]) {
            return true;
        }
        return false;
    };
    // 校验出生日期 20211001
    const checkDate = (dateVal) => {
        const reg = /^(19|20)\d{2}(0[1-9]|1[0-2])([0-2][1-9]|10|20|30|31)$/;
        if (reg.test(dateVal)) {
            const year = dateVal.slice(0, 4);
            const month = dateVal.slice(4, 6);
            const date = dateVal.slice(6);
            const birthDay = new Date(`${year}-${month}-${date}`);
            if (birthDay.getMonth() + 1 === Number.parseInt(month)) {
                return true;
            }
        }
        return false;
    };
    // 校验码：身份证前17位和加权因子表的乘积的总和与11的余数
    const checkCode = (id) => {
        const reg = /^([1-9][0-7])\d{4}(19|20)\d{2}(0[1-9]|1[0-2])([0-2][1-9]|10|20|30|31)(\d{3}\d|X|x)$/;
        if (reg.test(id)) {
            // 加权因子
            const factor = ['7','9','10','5','8','4','2','1','6','3','7','9','10','5','8','4','2'];
            // 检验码
            const parity = ['1','0','X','9','8','7','6','5','4','3','2'];
            const code = id.slice(0, 17);
            const checkCode = id.slice(17);
            let sum = 0;
            for (let i = 0; i < 17; i++) {
                sum += code[i] * factor[i];
            }
            if (parity[sum % 11] == checkCode) {
                return true;
            }
        }
        return false;
    };
    if (checkCode(id)) {
        if (checkProv(id.slice(0,2))) {
            if (checkDate(id.slice(6, 14))) {
                return true;
            }
        }
    }
    return false;
}

export default checkId;