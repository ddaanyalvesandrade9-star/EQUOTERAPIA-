/* =====================================================================
   EquoTEA · APAE Campina Grande
   BANCO DE DADOS DO SITE (fonte única de conteúdo dinâmico)

   Tabelas: config, cavalos, necessidades, parceiros, depoimentos, doacoes.
   O site lê estes dados e monta as seções automaticamente.
   O mesmo modelo existe em database/schema.sql (para um banco SQL real).

   Campo vazio ("") = informação ainda não fornecida. O site mostra
   "a informar" e NUNCA inventa dados.
   ===================================================================== */
window.EQUOTEA_DB = {

  /* ---------- Canais de contato (preencher quando disponíveis) ---------- */
  config: {
    instagram: "cepae.equoterapiaapaecg", // Instagram da equoterapia da APAE Campina Grande
    instagramConfirmado: true,
    whatsapp: "5583991149334",         // somente dígitos com DDI+DDD
    whatsappExibicao: "(83) 99114-9334",
    email: "apaecampinagrande@gmail.com",
    telefones: ["(83) 3315-8718", "(83) 98753-4217", "(83) 98753-4221"],
    endereco: "Rua Eutécia Vital Ribeiro, 525, Catolé, Campina Grande, Paraíba, Brasil",
    horario: { dias: "Segunda a sexta", funcionamento: "07:30 às 17:30", intervalo: "11:30 às 13:30" },
    pix: "",                           // chave PIX — AINDA NÃO INFORMADA
    pixTitular: ""
  },

  /* ---------- Cavalos (preencher nome, idade etc. e colocar as fotos) ---------- */
  cavalos: [
    { id: 1, nome: "", foto: "assets/fotos/cavalo-1.jpg", idade: "", pelagem: "", temperamento: "", papel: "" },
    { id: 2, nome: "", foto: "assets/fotos/cavalo-2.jpg", idade: "", pelagem: "", temperamento: "", papel: "" },
    { id: 3, nome: "", foto: "assets/fotos/cavalo-3.jpg", idade: "", pelagem: "", temperamento: "", papel: "" }
  ],

  /* ---------- Necessidades identificadas na visita técnica ---------- */
  necessidades: [
    {
      id: "infra", rotulo: "Infraestrutura", icone: "home",
      titulo: "Melhoria da infraestrutura",
      intro: "Um dos principais pontos de atenção é a estrutura dos espaços destinados aos cavalos. Durante a visita, observamos instalações com dimensões reduzidas, disposição inadequada e presença de entulhos nos ambientes.",
      grupos: [
        { titulo: "O que precisa melhorar?", itens: [
          "Construção ou reforma de baias, garantindo dimensões adequadas aos animais",
          "Melhor organização e distribuição dos espaços",
          "Ambientes limpos, arejados e protegidos das condições climáticas",
          "Retirada de entulhos e materiais descartados",
          "Espaços apropriados para descanso, alimentação e movimentação dos cavalos"
        ] }
      ],
      fecho: "Uma infraestrutura adequada é essencial para preservar a saúde, o conforto e a qualidade de vida dos animais."
    },
    {
      id: "montaria", rotulo: "Equipamentos de montaria", icone: "tool",
      titulo: "Renovação dos equipamentos de montaria",
      intro: "Os equipamentos usados nas sessões também merecem atenção. Alguns dos materiais disponíveis apresentam sinais de desgaste e precisam ser substituídos para garantir melhores condições de uso.",
      grupos: [
        { titulo: "Materiais necessários", itens: [
          "Selas adequadas à prática da equoterapia",
          "Mantas e protetores",
          "Cabeçadas e rédeas",
          "Estribos e acessórios de montaria",
          "Equipamentos de apoio e segurança"
        ] }
      ],
      fecho: "É importante adquirir selas adaptadas às necessidades dos praticantes, considerando as particularidades de pessoas com Transtorno do Espectro Autista (TEA) e de outras condições. Elas devem favorecer o posicionamento, a estabilidade e o conforto durante as sessões, respeitando as necessidades individuais."
    },
    {
      id: "veterinario", rotulo: "Materiais veterinários", icone: "cross",
      titulo: "Materiais para os cuidados veterinários",
      intro: "Além da infraestrutura e dos equipamentos de montaria, é necessário manter materiais para os cuidados diários e para a assistência veterinária dos cavalos.",
      grupos: [
        { titulo: "Primeiros socorros", itens: ["Gazes estéreis", "Ataduras e bandagens", "Luvas descartáveis", "Tesoura para curativos", "Soro fisiológico"] },
        { titulo: "Higiene e limpeza", itens: ["Escovas", "Produtos antissépticos apropriados", "Materiais para higienização dos animais e das instalações"] },
        { titulo: "Controle de parasitas", itens: ["Vermífugos", "Produtos para controle de parasitas externos, conforme avaliação veterinária"] },
        { titulo: "Medicamentos veterinários", itens: ["Analgésicos", "Anti-inflamatórios", "Cicatrizantes", "Produtos oftálmicos", "Sempre conforme necessidade e prescrição profissional"] },
        { titulo: "Monitoramento da saúde", itens: ["Termômetro veterinário", "Materiais básicos para avaliação clínica"] }
      ],
      fecho: "A disponibilidade desses recursos contribui para uma rotina de cuidados mais organizada, com maior atenção à saúde dos animais e assistência adequada quando necessário."
    }
  ],

  /* ---------- Formas de ajudar / parceiros ---------- */
  parceiros: [
    {
      id: "apadrinhe", titulo: "Apadrinhe um cavalo", tag: "Contribuição mensal", icone: "heart",
      destaque: "Uma forma de ajudar continuamente.",
      intro: "O apadrinhamento solidário permite que pessoas contribuam mensalmente com o cuidado e a manutenção dos cavalos que participam das atividades de equoterapia. Com uma contribuição voluntária, você ajuda a custear despesas como alimentação, cuidados veterinários, medicamentos, materiais de higiene e manutenção dos equipamentos.",
      listaTitulo: "Como participar?",
      itens: ["Escolha uma contribuição mensal que caiba no seu orçamento", "Entre em contato com a organização do projeto", "Receba informações sobre a destinação dos recursos e os resultados alcançados"],
      fecho: "Você não precisa doar muito para fazer a diferença. A união de pequenas contribuições pode garantir grandes melhorias."
    },
    {
      id: "alimentacao", titulo: "Doe alimentação", tag: "Doação de produtos", icone: "leaf",
      destaque: "Ajude a manter os cavalos bem alimentados!",
      intro: "A alimentação adequada é indispensável para a saúde, a disposição e a qualidade de vida dos cavalos. Você pode contribuir com a aquisição ou doação de alimentos e insumos necessários à rotina dos animais.",
      listaTitulo: "O que pode ser doado?",
      itens: ["Feno e volumosos adequados", "Ração específica para equinos", "Suplementos nutricionais, quando indicados", "Outros itens alimentares previamente solicitados pela equipe responsável"],
      comoParticipar: "Entre em contato para conhecer as necessidades atuais e verificar quais produtos podem ser recebidos.",
      fecho: "Uma alimentação de qualidade também é uma forma de cuidado e respeito."
    },
    {
      id: "empresa", titulo: "Seja um parceiro do bem", tag: "Parcerias e patrocínios", icone: "store",
      destaque: "Sua empresa também pode fazer parte dessa transformação!",
      intro: "Empresas, comércios, produtores rurais, profissionais autônomos e instituições podem contribuir com o fortalecimento da equoterapia por meio de parcerias e patrocínios.",
      listaTitulo: "As contribuições podem acontecer de diferentes maneiras",
      itens: ["Patrocínio financeiro mensal ou pontual", "Doação de produtos e materiais", "Descontos especiais na aquisição de insumos", "Disponibilização de serviços profissionais", "Apoio na divulgação das campanhas"],
      publicoTitulo: "Quem pode ser parceiro?",
      publico: "Clínicas veterinárias, lojas agropecuárias, casas de ração, laboratórios, empresas locais, produtores rurais, estabelecimentos comerciais e outras instituições interessadas na causa.",
      fecho: "A responsabilidade social das empresas também pode transformar realidades."
    },
    {
      id: "veterinaria", titulo: "Faça parte da rede veterinária solidária", tag: "Prestação de serviços profissionais", icone: "stetho",
      destaque: "Conhecimento e cuidado também são formas de doação!",
      intro: "A saúde dos cavalos é fundamental para que as atividades de equoterapia aconteçam com segurança e qualidade. Por isso, buscamos profissionais e estabelecimentos veterinários dispostos a contribuir com assistência e acompanhamento dos animais.",
      listaTitulo: "Como você pode contribuir?",
      itens: ["Consultas e avaliações clínicas", "Atendimento odontológico equino", "Acompanhamento nutricional", "Serviços de casqueamento e ferrageamento", "Exames laboratoriais e de imagem", "Vacinação, vermifugação e cuidados preventivos", "Orientações sobre manejo, higiene e bem-estar"],
      publicoTitulo: "Quem pode participar?",
      publico: "Médicos-veterinários, clínicas, hospitais veterinários, laboratórios, profissionais de odontologia equina, ferradores e demais especialistas.",
      fecho: "Seu conhecimento pode ajudar a proporcionar uma vida mais saudável e digna aos nossos cavalos."
    },
    {
      id: "instituicao", titulo: "Seja uma instituição parceira", tag: "Apoio institucional e acadêmico", icone: "building",
      destaque: "Juntos, podemos ampliar o alcance dessa iniciativa!",
      intro: "Universidades, faculdades, instituições de ensino e organizações podem contribuir com conhecimento, infraestrutura, projetos de extensão e ações que fortaleçam a equoterapia.",
      listaTitulo: "Possibilidades de colaboração",
      itens: ["Projetos de extensão universitária", "Assistência veterinária supervisionada", "Avaliações de saúde e bem-estar dos equinos", "Pesquisas e atividades acadêmicas", "Capacitações para profissionais e colaboradores", "Campanhas educativas e eventos de conscientização"],
      fecho: "A parceria entre instituições de ensino e a APAE pode aproximar a comunidade acadêmica das necessidades sociais, proporcionando experiências práticas aos estudantes e benefícios à instituição. Conhecimento compartilhado também gera transformação."
    }
  ],

  /* ---------- Depoimentos (somente com autorização por escrito de cada pessoa) ----------
     Modelo de registro: { id, autor: "Nome ou iniciais", vinculo: "Familiar de praticante", texto: "...", video: "assets/videos/arquivo.mp4" } */
  depoimentos: [],

  /* ---------- Prestação de contas (publicar periodicamente) ----------
     Modelo de registro: { id, data: "AAAA-MM-DD", tipo: "Entrada" | "Saída", descricao: "...", valor: 0.00, comprovante: "assets/contas/arquivo.pdf" } */
  doacoes: []
};
