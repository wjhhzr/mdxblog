module.exports = {
    prompt: ({ inquirer }) => {
      // defining questions in arrays ensures all questions are asked before next prompt is executed
      const questions = [{
        type: 'input',
        name: 'name',
        message: '文章标题',
      },
      {
        type: 'input',
        name: 'lead',
        message: '文章介绍',
      },
      {
        type: 'input',
        name: 'tags',
        message: '文章标签,例如(前端-后端)',
      }]
  
      return inquirer
        .prompt(questions)
        .then(answers => {
          const { tags } = answers
          answers.tags = tags.split('-')
          // both set of answers must be returned as a merged object, else the previous set of answers won't be available to the templates
          return answers
        })
    }
  }