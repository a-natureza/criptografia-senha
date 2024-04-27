const Curso = require("../models/Curso")

class CursoController {

    async cadastrar(req, res) {
        try {
            const nome = req.body.nome
            const duracao_horas = req.body.duracao_horas

            if (!nome) {
                return res.status(400).json({ message: "O nome é obrigatório" })
            }

            if (!(duracao_horas >= 40 && duracao_horas <= 200)) {
                return res.status(400).json({
                    message: "A duração do curso deve ser entre 40 e 200 horas"
                })
            }

            const curso = await Curso.create({
                nome: nome,
                duracao_horas: duracao_horas
            })

            res.status(201).json(curso)
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ error: 'Não possível cadastrar o curso' })
        }
    }
    

    async listar(req, res) {
        try {
            let params = {}

            // SE for passado uma paramero QUERY chamado "nome" na requisição, então
            // esse parametro "nome" é adicionado dentro da variavel params
            if (req.query.nome) {
                // o ...params, cria uma cópia do params com os chaves e valores já existentes
                params = { ...params, nome: req.query.nome }
            }

            if (req.query.duracao_horas) {
                // o ...params, cria uma cópia do params com os chaves e valores já existentes
                params = { ...params, duracao_horas: req.query.duracao_horas }
            }

            const cursos = await Curso.findAll({
                where: params
            })

            res.json(cursos)
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ error: 'Não possível listar todos os cursos' })
        }

    }
    async deletar(req, res) {
        try {
            const { id } = req.params

            Curso.destroy({
                where: {
                    id: id
                }
            }) // DELETE cursos from cursos where id = 1

            res.status(204).json({})
        } catch (error) {
            console.error(error.message)
            res.status(500).json({ error: 'Não foi possível deletar o curso' })
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params
            const curso = await Curso.findByPk(id)

            if (!curso) {
                return res.status(404).json({ message: 'Curso não encontrado' })
            }

            await curso.update(req.body)

            await curso.save()

            res.json(curso)

        } catch (error) {
            console.error(error.message)
            res.status(500).json({ error: 'Não foi possível atualizar o curso' })
        }
    }
}


module.exports = new CursoController()