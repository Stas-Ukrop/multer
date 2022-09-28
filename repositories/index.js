import Cat from '../model/cat.js'

const getAll=async(userId,query)=>{
    // const result = await Cat.find({ owner: userId }).populate({
    //     path: 'owner',
    //     select: 'name email gender -_id'
    // })
    const { sortBy,sortByDesc,filter,vaccinated=null,limit = 5, offset = 0 } = query
    const optionsSearch = { owner: userId }
    if (vaccinated != null) {
        optionsSearch.isVaccinated=vaccinated
    }
    const result = await Cat.paginate(optionsSearch, {
        limit, offset, sort: { 
            ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
            ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {})
        },
        select: filter?filter.split('|').join(' '):'',
        populate: { path: 'owner', select: 'name email gender' },
    })
    return result
}

const getById=async(userId,id)=>{
    const results=await Cat.findOne({_id:id,owner:userId})
    return results
}

const remove = async(userId,id)=>{
    const result =await Cat.findOneAndRemove({_id:id,owner:userId})
        return result
}

const create = async(userId,body)=>{
    const result = await Cat.create({owner:userId,...body})
    return result
}

    const update=async(userId,id,body)=>{
        const result =await Cat.findOneAndUpdate(
            {_id:id, owner:userId},
            {...body},
            {new:true})
        return result
    }

export default {
    getAll,
    getById,
    remove,
    create,
    update
}