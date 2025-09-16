const pageFloorHooks = () => {
    const adaptiveSpliceToLine = (input: any) => {
        const result = [];
        let i = 0;
        const n = input.length;
    
        while (i < n) {
            // 情况1：尝试单个元素组成4（优先级最高，调整幅度最小）
            if (input[i] <= 4) {
                // 检查是否可以直接用4作为一个分段
                const costSingle = 4 - input[i]; // 2,3
                // 情况2：尝试两个元素组成[2,2]（如果有下一个元素）
                let canTwoElements = false;
                let costTwo = Infinity;
                if (i + 1 < n) {
                    // 两个元素都能升级到2 0,1,2
                    if (input[i] <= 2 && input[i + 1] <= 2) {
                        // input[i] 1,2 cost 1,0
                        costTwo = (2 - input[i]) + (2 - input[i + 1]);
                        canTwoElements = true;
                    }
                }
    
                // 选择调整幅度最小的方案
                if (canTwoElements && costTwo < costSingle) {
                    result.push(2, 2);
                    i += 2; // 处理两个元素
                } else {
                    // 1,2 => 4
                    result.push(4);
                    i += 1; // 处理单个元素
                }
            } else {
                // 理论上输入只会是1、2、4，这里做容错处理
                result.push(input[i]);
                i += 1;
            }
        }
    
        return result;
    }
    
    // 测试案例
    const testCases = [
        [1, 1,1,1],       // 输出 [2, 2]
        [1, 4],       // 输出 [4, 4]
        [2, 2],       // 输出 [2, 2]
        [1],          // 输出 [4]
        [4, 1, 2],    // 输出 [4, 2, 2]（用户指定案例）
        [1, 1, 1],    // 输出 [2, 2, 4]（前两个组成2+2，最后一个单独4）
        [2, 1, 1],    // 输出 [2, 2, 2]（第二个和第三个组成2+2，第一个单独2无法成段，调整为4？不，修正为正确分段逻辑）
        [4, 4, 4],    // 输出 [4, 4, 4]
        [1, 2, 1],     // 输出 [2, 2, 4]（前两个1+2→2+2，最后1→4）
        [1,2,4,1,2,2,2,4,1,4,4,2,4]
    ];
    
    // 执行测试
    testCases.forEach(caseItem => {
        const output = adaptiveSpliceToLine(caseItem);
        console.log(`输入: [${caseItem}] → 输出: [${output}]`);
    });

    return {
        adaptiveSpliceToLine
    };
    
}

export default pageFloorHooks;