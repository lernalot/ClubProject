/**
 * 封装公用的上报数据的方法
 * 
 */

const reportMetric = (metricName: string, metricValue: number) => {
  if (typeof window !== 'undefined' && window['reportMetric']) {
    window['reportMetric'](metricName, metricValue);
  } else {
    console.warn('reportMetric function is not available in the current environment.');
  }
}

// 后端卡夫卡消息队列 消息队列 内存 ajax => taskData stack = [] 发布 stack.push(taskData) => 任务队列 事件桥梁 [push, delete, update] => 任务队列
// server订阅者 消费队列 data => 任务执行
// 任务队列 => 任务执行 => 上报数据
// 上报数据 => 任务完成
// 上报数据 => 任务失败
// 上报数据 => 任务重试
// 设计模式 算法 进程 内存 线程 不区分语言 职业生涯 操作系统http书籍阅读