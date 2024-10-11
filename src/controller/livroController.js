import { autor } from "../models/Autor.js";
import livro from "../models/Livro.js";

class LivroController {
  static async listarLivros(req, res) {
    try {
      const listaLivros = await livro.find({});
      res.status(200).json(listaLivros);
    } catch (error) {
      res.status(500).json({ msg: `${error.message} - falha na requisição` });
    }
  }

  static async listarLivroPorId(req, res) {
    try {
      const id = req.params.id;
      const listaLivroPorId = await livro.findById(id);
      res.status(200).json(listaLivroPorId);
    } catch (error) {
      res
        .status(500)
        .json({ msg: `${error.message} - falha na requisição do livro` });
    }
  }

  static async cadastrarLivro(req, res) {
    const novoLivro = req.body;
    try {
      const autorEncontrado = await autor.findById(novoLivro.autor);
      const livroCompleto = {
        ...novoLivro,
        autor: { ...autorEncontrado._doc },
      };
      const livroCriado = await livro.create(livroCompleto);
      res
        .status(201)
        .json({ msg: "Livro criado com suceso", livro: livroCriado });
    } catch (error) {
      res
        .status(500)
        .json({ msg: `${error.message} - falha ao cadastrar livro` });
    }
  }

  static async atualizarLivro(req, res) {
    try {
      const id = req.params.id;
      await livro.findByIdAndUpdate(id, req.body);
      res.status(200).json({ msg: "Livro atualizado com sucesso!", livro });
    } catch (error) {
      res
        .status(500)
        .json({ msg: `${error.message} - falha na atualização do livro` });
    }
  }

  static async deletarLivro(req, res) {
    try {
      const id = req.params.id;
      await livro.findByIdAndDelete(id);
      res.status(200).json({ msg: "Livro excluido com sucesso!", livro });
    } catch (error) {
      res
        .status(500)
        .json({ msg: `${error.message} - falha ao deletar o livro` });
    }
  }

  static async listarLivrosPorTitulo(req, res) {
    const titulo = req.query.titulo;
    try {
      const livrosPorTitulo = await livro.find({ titulo: titulo });
      res.status(200).json(livrosPorTitulo);
    } catch (error) {
      res.status(500).json({ msg: `${error.message} - falha na busca` });
    }
  }
}

export default LivroController;
