import  Mock from 'mockjs'
import data from '../data.json'

Mock.mock('sell/goods',{
    code:0,
    codeMsg:'成功',
    data:data.goods
});
Mock.mock('sell/ratings',{
    code:0,
    codeMsg:'成功',
    data:data.ratings
});
Mock.mock('sell/seller',{
    code:0,
    codeMsg:'成功',
    data:data.seller
});