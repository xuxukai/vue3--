
//接口函数
const url = 'https://meituan.thexxdd.cn/apit'

const urls = class {
    static m() {

        //注册接口
        const register = `${url}/register`
        //登录
        const login = `${url}/login`
        const pulluserlist = `${url}/pulluserlist`
        //获取桌号
        const gettable = `${url}/gettable`
        //订单
        const obtainorder = `${url}/obtainorder`
        //订单详情
        const vieworder = `${url}/vieworder`
        //图片上传接口
        const uploadres = `${url}/uploadres`
        // 获取菜品类目
        const obtaincate = `${url}/obtaincate`
        // 获取菜品单位
        const obtainunit = `${url}/obtainunit`
        // 添加菜品单位
        const dishunit = `${url}/dishunit`
        //添加提交
        const putdishes = `${url}/putdishes`
        //修改提交
        const editdishes = `${url}/editdishes`
        //查询菜品
        const obtaindishes = `${url}/obtaindishes`
        //菜品下架
        const fromsale = `${url}/fromsale`
        // 提交员工数据
        const addem = `${url}/addem`
        // 获取员工数据
        const getemployees = `${url}/getemployees`
        // 修改员工离职状态
        const modifyresi = `${url}/modifyresi`
        // 删除员工
        const deleteemp = `${url}/deleteemp`
        // 数据分析
        const analysis = `${url}/analysis`
        // 折线图的更新数据
        const switchcate = `${url}/switchcate`
        return {
            register,
            login,
            pulluserlist,
            gettable,
            obtainorder,
            vieworder,
            uploadres,
            obtaincate,
            obtainunit,
            dishunit,
            putdishes,
            editdishes,
            obtaindishes,
            fromsale,
            addem,
            getemployees,
            modifyresi,
            deleteemp,
            analysis,
            switchcate
        }
    }
}


export default urls