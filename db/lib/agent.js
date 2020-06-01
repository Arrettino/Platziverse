function setupAgent(AgentModel){
    async function findById(id){
        const Agent = await AgentModel.findByPk(id)
        return Agent 
    }

    return{
        findById
    }

}
module.exports = setupAgent