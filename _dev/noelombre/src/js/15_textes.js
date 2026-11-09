// Noëlombre — tous les textes du jeu (une seule globale : TXT)
const TXT = {
  quartiers: {
    bourg: { nom: 'Le Vieux Bourg', sous: 'Les maisons penchent pour mieux t’écouter passer.' },
    citrouilles: { nom: 'Les Potagers-Citrouilles', sous: 'Mille citrouilles s’allument dès que tu baisses les yeux.' },
    sapins: { nom: 'La Sapinière Tortillée', sous: 'Les sapins tordus clignotent comme s’ils chuchotaient.' },
    cimetiere: { nom: 'Le Cimetière Givré', sous: 'Ici, même les pierres tombales portent une tuque.' },
    lac: { nom: 'Les Lacs de Verglas', sous: 'La glace garde le reflet de gens qui ne sont plus là.' },
    foire: { nom: 'La Foire Endormie', sous: 'Les manèges attendent un dernier tour depuis longtemps.' }
  },

  reperes: {
    horloge: { nom: 'La Tour de l’Horloge tordue', desc: 'Ses aiguilles tournent dans les deux sens. Personne ne sait l’heure qu’il est, et c’est très bien ainsi.' },
    colline: { nom: 'La Colline en Spirale', desc: 'Le sentier s’enroule jusqu’à la pointe, qui s’enroule elle aussi. D’en haut, la ville paraît presque sage.' },
    mausolee: { nom: 'Le Mausolée de Givre', desc: 'Un tombeau de glace bleue où dorment des souvenirs bien emmitouflés. On dit qu’il ronfle en janvier.' },
    carrousel: { nom: 'Le Carrousel Sans Enfants', desc: 'Il tourne seul, en musique, pour des cavaliers invisibles. Les chevaux de bois te font un clin d’œil.' },
    kiosque: { nom: 'Le Kiosque du Lac Muet', desc: 'Sur la glace, des patineurs fantômes valsent autour d’un orchestre absent. Ils ne tombent jamais.' },
    sapin: { nom: 'Le Grand Sapin Bossu', desc: 'Si haut et si tordu qu’il se gratte le dos sur la lune. Chaque boule reflète une autre nuit.' },
    fontaine: { nom: 'La Fontaine Figée', desc: 'Son jet a gelé en plein élan, comme une phrase restée en suspens. L’eau attend le printemps.' },
    atelier: { nom: 'L’Atelier des Jouets Perdus', desc: 'Les établis débordent de jouets à moitié finis. Certains attendent encore qu’on leur visse une tête.' },
    puits: { nom: 'Le Puits aux Souhaits', desc: 'Lance-y un vœu : il répond parfois, avec un écho un peu trop poli.' },
    roue: { nom: 'La Grande Roue Figée', desc: 'Ses nacelles se balancent sans bruit, arrêtées au sommet d’un tour commencé il y a cent hivers.' },
    gare: { nom: 'La Gare du Train Jouet', desc: 'Un petit train de fer-blanc passe à l’heure, jamais la même. Le chef de gare est une mitaine.' },
    observatoire: { nom: 'L’Observatoire Lunaire', desc: 'Un télescope de cuivre vise la lune énorme. Regarde bien : elle te regarde aussi.' }
  },

  curiosites: [
    { id: 'c01', repere: 'horloge', nom: 'Une clochette à l’envers', desc: 'Elle sonne avant qu’on la touche, puis elle s’excuse.' },
    { id: 'c02', repere: 'horloge', nom: 'Un coucou insomniaque', desc: 'Il sort toutes les trois minutes pour vérifier que tu dors pas.' },
    { id: 'c03', repere: 'horloge', nom: 'Une aiguille des secondes', desc: 'Tombée de la tour, elle continue de compter toute seule, un peu essoufflée.' },
    { id: 'c04', repere: 'horloge', nom: 'Un sablier de neige', desc: 'Les flocons y tombent vers le haut. Le temps ne sait plus où se mettre.' },

    { id: 'c05', repere: 'colline', nom: 'Un escargot de givre', desc: 'Il gravit la colline depuis l’an mille. Il est presque rendu.' },
    { id: 'c06', repere: 'colline', nom: 'Une boussole étourdie', desc: 'Elle tourne en rond, fidèle au sentier.' },
    { id: 'c07', repere: 'colline', nom: 'Un cerf-volant prisonnier', desc: 'Accroché à la pointe, il rêve encore du vent du sud.' },
    { id: 'c08', repere: 'colline', nom: 'Une tuque géante', desc: 'Assez grande pour coiffer la colline. Quelqu’un a essayé.' },

    { id: 'c09', repere: 'mausolee', nom: 'Une rose de glace', desc: 'Elle ne fane jamais. Elle fond un peu quand on lui parle doucement.' },
    { id: 'c10', repere: 'mausolee', nom: 'Une épitaphe rigolote', desc: '« Ci-gît Bertrand, qui avait raison. » Personne ne se souvient sur quoi.' },
    { id: 'c11', repere: 'mausolee', nom: 'Un chandelier frileux', desc: 'Ses bougies grelottent, mais refusent de s’éteindre, par orgueil.' },
    { id: 'c12', repere: 'mausolee', nom: 'Une clé sans serrure', desc: 'Elle ouvre quelque chose, quelque part. Sans doute un placard très triste.' },

    { id: 'c13', repere: 'carrousel', nom: 'Un cheval de bois enrhumé', desc: 'Il éternue des copeaux à chaque tour.' },
    { id: 'c14', repere: 'carrousel', nom: 'Un ticket du dernier tour', desc: 'Valide jusqu’à hier. Le tampon, lui, sourit encore.' },
    { id: 'c15', repere: 'carrousel', nom: 'Une boîte à musique fêlée', desc: 'Elle joue une valse avec trois fausses notes, toujours les mêmes, avec conviction.' },
    { id: 'c16', repere: 'carrousel', nom: 'Un ballon qui refuse de monter', desc: 'Il préfère rester ici, à regarder tourner les chevaux.' },

    { id: 'c17', repere: 'kiosque', nom: 'Un patin orphelin', desc: 'Son jumeau patine encore, quelque part sous la glace.' },
    { id: 'c18', repere: 'kiosque', nom: 'Une partition gelée', desc: 'Les notes sont prises dans le givre. Souffle dessus pour entendre un do.' },
    { id: 'c19', repere: 'kiosque', nom: 'Une baguette de chef', desc: 'Elle dirige encore un orchestre invisible, avec beaucoup de sérieux.' },
    { id: 'c20', repere: 'kiosque', nom: 'Une écharpe de fantôme', desc: 'Tricotée en brume. Elle tient chaud aux idées.' },

    { id: 'c21', repere: 'sapin', nom: 'Une boule qui reflète demain', desc: 'On y voit la même rue, en un peu plus enneigée.' },
    { id: 'c22', repere: 'sapin', nom: 'Une guirlande qui chuchote', desc: 'Elle clignote en morse. Surtout des potins.' },
    { id: 'c23', repere: 'sapin', nom: 'Une étoile tombée de la cime', desc: 'Elle s’est fait une bosse et refuse de remonter.' },
    { id: 'c24', repere: 'sapin', nom: 'Une aiguille de sapin géante', desc: 'Elle pique et elle sent bon. Les deux, très fort.' },

    { id: 'c25', repere: 'fontaine', nom: 'Une pièce gelée en plein vol', desc: 'Lancée il y a cent ans. Le vœu attend toujours sa réponse.' },
    { id: 'c26', repere: 'fontaine', nom: 'Un poisson de cristal', desc: 'Il nage dans un glaçon, très lentement, avec une grande dignité.' },
    { id: 'c27', repere: 'fontaine', nom: 'Une goutte indécise', desc: 'Elle hésite entre tomber et rester. Ça fait un siècle.' },
    { id: 'c28', repere: 'fontaine', nom: 'Une grenouille en mitaines', desc: 'Elle attend le dégel en lisant les nuages.' },

    { id: 'c29', repere: 'atelier', nom: 'Un ourson à un seul bouton', desc: 'Il voit le monde à moitié, mais il le trouve quand même charmant.' },
    { id: 'c30', repere: 'atelier', nom: 'Une toupie infatigable', desc: 'Elle tourne depuis la fermeture de l’atelier. Surtout, ne l’arrête pas.' },
    { id: 'c31', repere: 'atelier', nom: 'Un soldat de plomb poli', desc: 'Il salue tout le monde, même les courants d’air.' },
    { id: 'c32', repere: 'atelier', nom: 'Un plan de jouet impossible', desc: 'Un yo-yo qui revient avant de partir. Brevet en attente.' },

    { id: 'c33', repere: 'puits', nom: 'Un vœu refusé', desc: 'Sur un papier mouillé : « Plus de neige. » Refusé : déjà accordé.' },
    { id: 'c34', repere: 'puits', nom: 'Un seau plein d’étoiles', desc: 'Remonté du fond du puits. Ça brille et ça clapote.' },
    { id: 'c35', repere: 'puits', nom: 'Un écho timide', desc: 'Il répète ce que tu dis, mais plus bas, pour pas déranger.' },
    { id: 'c36', repere: 'puits', nom: 'Un sou porte-bonheur', desc: 'Il porte surtout malheur aux autres sous.' },

    { id: 'c37', repere: 'roue', nom: 'Une nacelle qui se balance', desc: 'Personne dedans. Elle se balance quand même, pour la forme.' },
    { id: 'c38', repere: 'roue', nom: 'Une barbe à papa fossile', desc: 'Rose, dure comme de la roche, encore un peu sucrée.' },
    { id: 'c39', repere: 'roue', nom: 'Un billet de la grande roue', desc: 'Il donne droit à un tour et demi. Le demi, c’est le plus long.' },
    { id: 'c40', repere: 'roue', nom: 'Un écrou du sommet', desc: 'Tombé de tout en haut. Il a vu la ville entière et n’en revient pas.' },

    { id: 'c41', repere: 'gare', nom: 'Un horaire des trains rêvés', desc: 'Départ : quand tu veux. Arrivée : ailleurs.' },
    { id: 'c42', repere: 'gare', nom: 'Un wagon minuscule', desc: 'Il transporte un seul flocon, très important.' },
    { id: 'c43', repere: 'gare', nom: 'Une valise qui fait tic-tac', desc: 'Sûrement un réveille-matin. Sûrement.' },
    { id: 'c44', repere: 'gare', nom: 'Un sifflet de chef de gare', desc: 'Il siffle tout seul quand le train est en retard. Donc souvent.' },

    { id: 'c45', repere: 'observatoire', nom: 'Un morceau de lune', desc: 'Il sent le fromage et la poussière. Les deux rumeurs étaient vraies.' },
    { id: 'c46', repere: 'observatoire', nom: 'Une carte du ciel à l’envers', desc: 'Les constellations y sont rangées par ordre de gentillesse.' },
    { id: 'c47', repere: 'observatoire', nom: 'Une lentille amoureuse', desc: 'Elle ne montre qu’une seule étoile, toujours la même.' },
    { id: 'c48', repere: 'observatoire', nom: 'Un télescope de poche', desc: 'Il grossit les petites choses, surtout les soucis. À manier avec soin.' }
  ],

  etoiles: [
    'Étoile du Tic-Tac Perdu',
    'Étoile de la Spirale',
    'Étoile du Dernier Givre',
    'Étoile du Manège Muet',
    'Étoile de la Valse Gelée',
    'Étoile de la Cime Bossue',
    'Étoile du Jet Suspendu',
    'Étoile des Jouets Oubliés',
    'Étoile du Vœu Profond',
    'Étoile du Tour Sans Fin',
    'Étoile du Quai Fantôme',
    'Étoile du Clin de Lune'
  ],

  habitants: {
    prenoms: [
      'Madame Grisaille', 'Le vieux Tournevis', 'Monsieur Pelure', 'Dame Chandelle', 'Le petit Frimas',
      'Tante Courant-d’Air', 'Oncle Bric-à-Brac', 'Mademoiselle Suie', 'Le baron Grelot', 'Mère Fourchette',
      'Le docteur Pantoufle', 'Grand-maman Verglas', 'Monsieur Escalier', 'Dame Ficelle', 'Le sieur Glaçon',
      'Ti-Gus Lanterneau', 'Madame Biscotte', 'Le vieux Ramoneur', 'Sœur Mitaine', 'Le comte Courgette',
      'Mamie Bourrasque', 'Monsieur Hibou-Hibou', 'La veuve Clochette', 'Le gros Navet', 'Dame Brindille',
      'Pépère Cornichon', 'Mademoiselle Ombrelle', 'Le capitaine Tisane', 'Madame Toupie', 'Le notaire Frisson',
      'Ti-Pit Engelure', 'Dame Lune-de-Biais', 'Monsieur Poussière', 'La cousine Gelée', 'Le vieux Craque-Bois',
      'Mère Chaudron', 'Le petit Pétard', 'Madame Ravioli', 'Oncle Sapinage', 'Le marquis Moufle'
    ],
    lettres: [
      'Oh ! Un cadeau ! Je vais le garder fermé, c’est plus excitant.',
      'Merci. Je vais le ranger avec mes autres cadeaux… j’en ai pas d’autres.',
      'Tu sens la neige et la lanterne. C’est bon signe.',
      'Mon chat te remercie. Moi, je réfléchis encore.',
      'Il fait tic-tac ? Non ? Tant mieux. Merci !',
      'Je l’attendais depuis l’an passé. Ou l’an prochain. Merci !',
      'T’es bien fin de passer. Les fantômes, eux, oublient toujours.',
      'Un cadeau ! Je vais le déballer très, très lentement. Genre en mars.',
      'Merci, voyageur. Ma porte grincera un peu moins pour toi.',
      'C’est exactement ce que je n’osais pas demander.',
      'Ça tombe bien : ma cheminée s’ennuyait.',
      'Merci ! Je t’offrirais bien un biscuit, mais il est hanté.',
      'Pose-le là, à côté de la citrouille qui ronfle.',
      'Que ta lanterne brûle longtemps et que tes bas restent secs !',
      'Oh, il est emballé à l’envers ! Mon préféré.',
      'Mes ancêtres te saluent. Ils sont dans le grenier.',
      'Merci ben ! T’es pas mal plus fiable que le traîneau.',
      'Je vais l’ouvrir à minuit, quand la lune regarde pas.',
      'Mon cœur est tout réchauffé. Mes pieds, pas encore.',
      'Tu reviendras ? La maison aime bien les visites.'
    ]
  },

  quetes: [
    { type: 'bonbons', texte: 'Ramasse {n} bonbons givrés', variantes: ['Remplis tes poches de {n} bonbons givrés'] },
    { type: 'livrer', texte: 'Livre {n} cadeaux aux portes à couronne verte', variantes: ['Dépose {n} cadeaux chez des habitants qui attendent'] },
    { type: 'lanternes', texte: 'Allume {n} lanternes', variantes: ['Rallume {n} lanternes endormies'] },
    { type: 'spectres', texte: 'Dissipe {n} spectres avec l’Éclat', variantes: ['Chasse {n} spectres d’un éclat de lumière'] },
    { type: 'distance', texte: 'Marche {n} mètres dans la nuit', variantes: ['Explore la ville sur {n} mètres'] },
    { type: 'repere', texte: 'Trouve un nouveau repère', variantes: ['Découvre un lieu que personne n’a vu depuis longtemps'] },
    { type: 'quartier', texte: 'Rejoins le quartier « {lieu} »', variantes: ['Va faire un tour du côté de « {lieu} »'] },
    { type: 'curiosite', texte: 'Trouve une curiosité', variantes: ['Déniche un objet étrange près d’un repère'] }
  ],

  astuces: [
    'Le froid monte dans le noir. Reste près des lanternes, des fenêtres et des braseros.',
    'Près d’une lanterne, d’une fenêtre éclairée ou d’un brasero, ta chaleur remonte.',
    'Si tu t’évanouis de froid, tu te réveilles à la dernière lanterne allumée.',
    'L’Éclat (bouton ✦) chasse les spectres autour de toi.',
    'Les portes à couronne verte attendent un cadeau. Va cogner !',
    'L’Atelier (bouton) vend des améliorations. Passe souvent !',
    'La Lanterne améliorée agrandit ta bulle de lumière.',
    'Sur la carte, tu peux voyager d’une lanterne allumée à une autre.',
    'Grimpe la colline en spirale : de là-haut, on voit bien plus loin.',
    'Parfois, minuit sonne… et un traîneau passe dans le ciel.',
    'Allume chaque lanterne croisée : c’est un refuge pour plus tard.',
    'Les bonbons givrés traînent partout. L’Aimant les attire de plus loin.',
    'Chaque repère cache une Étoile d’ombre. Il y en a 12 en tout.',
    'Les Bottes te font marcher plus vite ; l’Écharpe ralentit le froid.',
    'Avec les Ressorts, tu sautes plus haut, puis même deux fois de suite.',
    'La Boussole pointe vers le repère inconnu le plus proche.'
  ],

  intro: {
    titre: 'Noëlombre',
    sous: 'Une nuit de Noël qui ne finit jamais.',
    histoire: 'Tu te réveilles dans une ville de Noël sans fin, sous une lune énorme, au creux d’une bulle de lumière. Ta lanterne te garde au chaud, mais la nuit, elle, a froid. Trouve les 12 Étoiles d’ombre avant que le givre t’oublie.'
  },

  ameliorations: {
    lanterne: { nom: 'Lanterne', desc: 'Agrandit ta bulle de lumière et te réchauffe mieux.' },
    bottes: { nom: 'Bottes de feutre', desc: 'Tu marches plus vite dans la neige.' },
    echarpe: { nom: 'Écharpe de grand-mère', desc: 'Le froid te gagne moins vite.' },
    sac: { nom: 'Sac de lutin', desc: 'Porte plus de cadeaux à la fois.' },
    aimant: { nom: 'Aimant à bonbons', desc: 'Attire les bonbons givrés de plus loin.' },
    ressorts: { nom: 'Ressorts de semelles', desc: 'Saute plus haut, puis débloque le double saut.' },
    boussole: { nom: 'Boussole curieuse', desc: 'Une flèche pointe vers le repère inconnu le plus proche.' },
    eclat: { nom: 'Cœur d’Éclat', desc: 'Un éclat plus large et une recharge plus rapide.' }
  },

  rangs: [
    'Somnambule égaré',
    'Passant frileux',
    'Porteur de mitaines',
    'Livreur de minuit',
    'Allumeur de lanternes',
    'Messager du givre',
    'Ami des spectres',
    'Gardien des couronnes',
    'Lutin de l’ombre',
    'Grand Veilleur de Noëlombre'
  ]
};
