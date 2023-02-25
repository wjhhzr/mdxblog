import simpleGit from "simple-git";
import path from 'path';
import fs from 'fs-extra'
import Mongo from './mongo'
const codePath = path.join(process.cwd(), "code");
const options = {
    baseDir: codePath,
    binary: 'git',
    maxConcurrentProcesses: 6,
};

/**
 * 获取提交记录
 */
const updateLogs = async () => {
    try {
        const codeExist = fs.pathExistsSync(codePath)
        if (codeExist) fs.removeSync(codePath);
        fs.mkdirsSync(codePath);
        const git = simpleGit(options)
        const repoPath = "https://gitee.com/codehunterwjh/mdxblog.git"
        await git.clone(repoPath, codePath)
        const logoInfo = await git.log();
        const newLogs = logoInfo.all;
        // 获取到日志后，就更新日志库
        const mongo = new Mongo({
            dbUrl: process.env.DB,
            database: "blog",
            collection: "updateLog"
        })
        const oldLogs = await mongo.query({});
        console.log("查询到的更更新日志", oldLogs);
        // 寻找需要更新的数据
        const needInsert = newLogs.filter((l) => !oldLogs.find(o => o.hash === l.hash));
        if(needInsert.length > 0) await mongo.insertMany(needInsert);
    } catch (e) {
        console.log("日志更新出错啦",e)
    } finally {
        fs.removeSync(codePath);
        console.log("移除log文件成功！");
    }
}

export default updateLogs;