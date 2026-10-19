/* ===================== TEXTES : INCIDENTS DE LABO ===================== */
// Événements absurdes affichés en grand bandeau « ALERTE » toutes les quelques minutes.
// e = ère minimale (1..9), k = type d’effet (appliqué et affiché par le moteur) :
//   "gain"  : le labo gagne d’un coup un paquet de molécules
//   "buff"  : production boostée quelques instants
//   "click" : clics surpuissants quelques instants
//   "free"  : des bâtiments gratuits apparaissent
//   "gold"  : une fiole dorée surgit
//   "storm" : pluie de mini-fioles à attraper
//   "chaos" : effet aléatoire (réservé aux incidents les plus fous)
// n = titre court, t = texte de l’alerte (sans chiffres d’effet). Placeholder : {labo} (nom du labo).
// Personnages récurrents : Kévin (le stagiaire), Mme Duchemin (la voisine) et Pistache (son chat),
// le comité d’éthique (toujours dépassé), le Professeur Grinchard (l’éternel rival).
const TXT_INCIDENTS = [
  /* ---------- Ère 1 : le Garage ---------- */
  { e: 1, k: "gain", n: "Kévin a bu un truc", t: "Kévin a avalé un flacon sans étiquette « pour goûter ». Il éternue désormais des molécules. On récupère tout à la passoire." },
  { e: 1, k: "gain", n: "Trésor sous l’établi", t: "En cherchant un tournevis, Kévin découvre sous l’établi un bocal de molécules oublié depuis 1987. Elles sont encore bonnes." },
  { e: 1, k: "buff", n: "Le cake de la voisine", t: "Mme Duchemin apporte un cake « pour que vous arrêtiez le bruit ». La surdose de sucre galvanise toute l’équipe. Le bruit redouble." },
  { e: 1, k: "buff", n: "Le chien bat la mesure", t: "Le chien des Martin aboie pile au tempo des réactions. Les molécules adorent et se synthétisent en cadence. Surtout, ne le faites pas taire." },
  { e: 1, k: "click", n: "Café trop serré", t: "Quelqu’un a remplacé le sucre du café par un réactif énergisant. Vos doigts tapent tout seuls. Profitez-en avant la descente." },
  { e: 1, k: "click", n: "L’éprouvette chatouilleuse", t: "L’éprouvette est devenue chatouilleuse. À chaque clic, elle glousse et recrache des molécules en rafale. Chatouillez sans pitié !" },
  { e: 1, k: "free", n: "Vide-grenier par-dessus la haie", t: "Mme Duchemin vide son grenier et jette par-dessus la haie tout ce qui « ressemble à de la science ». Le labo s’équipe gratuitement." },
  { e: 1, k: "free", n: "Les cousins de Kévin", t: "Kévin a invité ses cousins pour « un stage d’une journée ». Ils sont restés. Ils ne sont pas payés. Ils sont partout." },
  { e: 1, k: "gold", n: "Pistache a rapporté un truc", t: "Pistache, le chat de la voisine, dépose une fiole dorée sur le paillasson. Où l’a-t-il trouvée ? Personne n’ose lui demander." },
  { e: 1, k: "gold", n: "Erreur du facteur", t: "Le facteur livre par erreur un colis du Professeur Grinchard. Dedans : une fiole dorée et une lettre d’amour qu’il s’adresse à lui-même." },
  { e: 1, k: "storm", n: "Le congélateur a lâché", t: "Le vieux congélateur du garage rend l’âme : des dizaines de mini-fioles gelées roulent partout. Ramassez-les avant qu’elles fondent !" },
  { e: 1, k: "storm", n: "Gouttière fluo", t: "La gouttière du garage déborde d’un liquide fluo. Chaque goutte se solidifie en mini-fiole avant de toucher le sol. Tendez les mains !" },

  /* ---------- Ère 2 : l’Université ---------- */
  { e: 2, k: "gain", n: "Trois zéros de trop", t: "La comptabilité de l’université a ajouté trois zéros à la subvention du labo. Personne ne s’en plaint. Surtout pas {labo}." },
  { e: 2, k: "gain", n: "Kévin vend ses notes", t: "Kévin a vendu ses notes de cours aux étudiants de première année. Elles sont toutes fausses, mais très demandées. Le labo encaisse." },
  { e: 2, k: "buff", n: "Semaine des partiels", t: "C’est la semaine des partiels : terrifiés, les étudiants travaillent enfin. Le labo n’a jamais été aussi productif." },
  { e: 2, k: "buff", n: "Le comité part en séminaire", t: "Le comité d’éthique part en séminaire « Éthique et farniente » aux Baléares. Le labo en profite pour tout pousser à fond." },
  { e: 2, k: "click", n: "Thésard en panique", t: "Un thésard doit rendre sa thèse ce soir. Sa panique est contagieuse : vous cliquez sur la fiole comme si votre diplôme en dépendait." },
  { e: 2, k: "click", n: "Cours d’EPS détourné", t: "Le professeur d’EPS remplace les pompes par des séries de clics. Vos index sont désormais des athlètes de haut niveau." },
  { e: 2, k: "free", n: "Le doyen s’est endormi", t: "Le doyen s’est endormi en signant les bons de commande. Il en a signé une pile entière. Les livraisons arrivent déjà." },
  { e: 2, k: "free", n: "Une promo entière en stage", t: "Le service des stages a envoyé au labo une promo entière au lieu d’un seul étudiant. Ils sont déjà en blouse. Pas de retour possible." },
  { e: 2, k: "gold", n: "Distributeur détraqué", t: "Le distributeur de la cafétéria avale une pièce et recrache une fiole dorée. Une file d’attente se forme jusqu’au parking." },
  { e: 2, k: "gold", n: "Le trophée de Grinchard", t: "Le Professeur Grinchard égare sa fiole dorée « Meilleur chercheur de l’année », qu’il s’était décernée lui-même. Elle a roulé jusqu’ici." },
  { e: 2, k: "storm", n: "Bataille de fioles en amphi", t: "Chimistes et physiciens se livrent une bataille de fioles en plein amphi. Il en pleut de partout. Récupérez les munitions !" },
  { e: 2, k: "storm", n: "Lâcher de fin d’année", t: "Le bureau des élèves fête la fin des examens par un lâcher de mini-fioles depuis le toit. C’est festif, interdit et un peu toxique." },

  /* ---------- Ère 3 : la MégaCorp ---------- */
  { e: 3, k: "gain", n: "Entrée en Bourse", t: "{labo} entre en Bourse. L’action grimpe si haut qu’il faut affréter une fusée pour aller encaisser les molécules." },
  { e: 3, k: "gain", n: "Brevet sur l’eau mouillée", t: "Le service juridique a breveté le fait que l’eau mouille. Les redevances arrivent par camions entiers de molécules." },
  { e: 3, k: "buff", n: "Séminaire de motivation", t: "Le consultant en motivation crie « SYNERGIE ! » si fort que les machines y croient. Productivité en hausse, tympans en baisse." },
  { e: 3, k: "buff", n: "Feng shui moléculaire", t: "Un consultant réoriente tout l’open space selon les principes du feng shui moléculaire. Les ondes circulent, la production aussi." },
  { e: 3, k: "click", n: "Bouton « Cliquer plus fort »", t: "Le service informatique installe sur la fiole un bouton « Cliquer plus fort ». Il fonctionne. Personne ne sait pourquoi." },
  { e: 3, k: "click", n: "Concours du stagiaire du mois", t: "Concours interne : le stagiaire du mois sera celui qui clique le plus. Kévin s’échauffe les phalanges. Vous aussi, apparemment." },
  { b: "clonage", e: 3, k: "free", n: "Les clones se clonent", t: "Les clones de Kévin se sont clonés eux-mêmes pendant la pause déjeuner. Les RH renoncent à les compter et les déclarent « offerts »." },
  { e: 3, k: "free", n: "Grinchard en liquidation", t: "L’entreprise du Professeur Grinchard fait faillite. Ses machines sont bradées sur le trottoir. Le labo passe avant les éboueurs." },
  { e: 3, k: "gold", n: "Le porte-bonheur du PDG", t: "Le PDG laisse tomber sa fiole dorée porte-bonheur dans la cage d’ascenseur. Elle dévale les quatre-vingts étages. Attrapez-la !" },
  { e: 3, k: "storm", n: "Drone de livraison égaré", t: "Un drone de livraison confond le labo avec un entrepôt et largue des milliers de mini-fioles sur le parking. Servez-vous !" },
  { e: 3, k: "storm", n: "Accueil en surchauffe", t: "Le distributeur de cadeaux de l’accueil s’emballe et crache des fioles-souvenirs à la chaîne. Les actionnaires se jettent dessus." },
  { e: 3, k: "chaos", n: "Fusion des services", t: "Les RH, le marketing et la chimie fusionnent en un seul service. Personne ne sait ce qu’il fait. Ça pourrait être génial. Ou pas." },

  /* ---------- Ère 4 : l’Ère atomique ---------- */
  { e: 4, k: "gain", n: "Fuite au réacteur !", t: "Fuite au réacteur ! Rassurez-vous : il ne fuit que des molécules. On a mis des seaux. Les seaux débordent." },
  { e: 4, k: "gain", n: "Hortensias à l’eau lourde", t: "Arrosés par Kévin à l’eau lourde, les hortensias de Mme Duchemin donnent des molécules au lieu de fleurs. Elle accepte de partager." },
  { e: 4, k: "buff", n: "Le gros bouton rouge", t: "Kévin a appuyé sur le gros bouton rouge « pour voir ». Le réacteur passe en mode turbo. Personne ne trouve le bouton vert." },
  { e: 4, k: "buff", n: "Le réacteur a le hoquet", t: "Le réacteur à fusion a le hoquet. Chaque « hic » libère une bouffée d’énergie. Personne n’ose lui faire peur pour l’arrêter." },
  { e: 4, k: "click", n: "Doigts phosphorescents", t: "Après une visite un peu longue près du réacteur, vos doigts brillent dans le noir. Ils cliquent aussi beaucoup plus fort." },
  { e: 4, k: "click", n: "La souris a muté", t: "Une souris de labo irradiée a développé des biceps énormes. Elle s’entraîne sur la fiole avec vous. Ne la contrariez pas." },
  { e: 4, k: "free", n: "Fission immobilière", t: "Une réaction en chaîne s’emballe : les bâtiments du labo se divisent par fission. Chaque moitié est un bâtiment entier. Merci, la physique !" },
  { e: 4, k: "free", n: "Le comité capitule", t: "Le comité d’éthique, assommé par un exposé de quatorze heures, restitue toutes les machines saisies l’an dernier. Il demande une sieste." },
  { e: 4, k: "gold", n: "L’isotope prétentieux", t: "Le réacteur produit un isotope inconnu, doré et légèrement prétentieux. Il exige d’être mis en fiole et admiré. Admirez-le vite." },
  { e: 4, k: "storm", n: "Retombées en fioles", t: "Le panache du réacteur retombe en pluie de mini-fioles sur toute la région. Les parapluies ne servent à rien. Les seaux, si." },
  { e: 4, k: "storm", n: "Le compteur Geiger s’affole", t: "Le compteur Geiger crépite si fort qu’il fait trembler les étagères. Des dizaines de fioles dégringolent. Rattrapez-les au vol !" },
  { e: 4, k: "chaos", n: "Pistache dans le réacteur", t: "Pistache s’est enfermé dans le cœur du réacteur. Il est à la fois en pleine forme et pas du tout. Ouvrir la trappe aura des conséquences." },

  /* ---------- Ère 5 : l’Ère orbitale ---------- */
  { e: 5, k: "gain", n: "La Lune demande l’asile", t: "Lassée de tourner en rond, la Lune demande l’asile au labo. En gage de bonne foi, elle verse un plein cratère de molécules." },
  { e: 5, k: "gain", n: "Loyer orbital", t: "Les satellites garés sur l’orbite du labo reçoivent enfin leur avis de loyer. Ils paient en molécules, avec un léger décalage du signal." },
  { e: 5, k: "buff", n: "Apesanteur euphorique", t: "La station passe en apesanteur totale. Libérées de la gravité, les molécules se synthétisent en dansant. La production décolle." },
  { e: 5, k: "buff", n: "Seize levers de Soleil", t: "En orbite, le Soleil se lève toutes les quatre-vingt-dix minutes. L’équipe enchaîne les cafés du matin. Les machines aussi." },
  { e: 5, k: "click", n: "Gants de scaphandre motorisés", t: "Kévin oublie ses gants de scaphandre motorisés sur votre bureau. Vous les enfilez. Grosse erreur. Excellente erreur." },
  { e: 5, k: "click", n: "Pistache en apesanteur", t: "Pistache s’est glissé dans la fusée de ravitaillement. En apesanteur, il tape la fiole de la patte. Vous l’imitez : c’est redoutable." },
  { e: 5, k: "free", n: "Satellite cherche famille", t: "Un vieux satellite abandonné se met en orbite autour du labo et demande à être adopté. Il arrive avec tout son équipement." },
  { e: 5, k: "gold", n: "Comète dorée", t: "Une petite comète dorée s’écrase dans le bac à sable de la station. Elle a exactement la forme d’une fiole. C’est sûrement un signe." },
  { e: 5, k: "storm", n: "Pluie de micrométéorites", t: "La station traverse une pluie de micrométéorites. Au contact du blindage, chacune se change en mini-fiole. Le hublot est ouvert, allez-y !" },
  { e: 5, k: "storm", n: "Grand nettoyage orbital", t: "Les débris spatiaux recyclés par le labo retombent en mini-fioles. Attrapez-les avant leur rentrée dans l’atmosphère !" },
  { e: 5, k: "chaos", n: "Kévin a ouvert le sas", t: "Kévin a ouvert le sas « pour aérer ». Tout le labo s’envole dans l’espace puis revient, mais pas forcément dans le bon ordre." },
  { e: 5, k: "chaos", n: "Grinchard percute la station", t: "La montgolfière orbitale du Professeur Grinchard percute la station. Tous les boutons du tableau de bord s’enfoncent en même temps." },

  /* ---------- Ère 6 : l’Ère dimensionnelle ---------- */
  { e: 6, k: "gain", n: "Soldes chez les voisins", t: "Un labo d’une dimension voisine fait faillite et brade son stock de molécules au prix du néant. Le portail avale tout." },
  { e: 6, k: "gain", n: "Le cadeau de Pistache", t: "Pistache revient d’un portail en traînant une souris géante faite de molécules pures. Mme Duchemin refuse qu’on la lui rende." },
  { e: 6, k: "buff", n: "Les Kévin synchronisés", t: "Les Kévin de quatorze dimensions renversent le même flacon au même instant. L’onde de choc dope toute la production." },
  { e: 6, k: "buff", n: "Le gentil Grinchard", t: "Dans une dimension voisine, le Professeur Grinchard est un génie bienveillant. Il nous envoie ses meilleures astuces. Le nôtre boude." },
  { e: 6, k: "click", n: "Mains empruntées", t: "Vos doubles de six dimensions vous prêtent leurs mains quelques instants. Vous cliquez avec bien trop de doigts. C’est merveilleux." },
  { e: 6, k: "free", n: "Déménagement bâclé", t: "Un labo de la dimension voisine déménage et oublie la moitié de ses machines dans notre entrepôt. On ne rendra rien." },
  { e: 6, k: "gold", n: "Colis de vous-même", t: "Une fiole dorée traverse le portail avec un mot : « De la part de vous-même. Ne posez pas de questions. » On n’en pose pas." },
  { e: 6, k: "storm", n: "Portail mal fermé", t: "Quelqu’un a laissé le portail entrouvert sur la dimension des fioles. Elles s’engouffrent par milliers. Courez !" },
  { e: 6, k: "chaos", n: "Vous-même emprunte du sel", t: "Un vous-même d’une autre dimension vient emprunter du sel. En partant, il appuie sur un bouton au hasard « pour rendre service »." },
  { e: 6, k: "chaos", n: "Douze Mme Duchemin", t: "Douze Mme Duchemin venues de douze dimensions se plaignent en même temps. La réalité vibre. Les machines font n’importe quoi." },
  { e: 6, k: "chaos", n: "Portail branché à l’envers", t: "Le portail est branché à l’envers : la gauche est à droite, le haut est dedans et Kévin est compétent. Tout peut arriver." },
  { b: "chrono", e: 6, k: "chaos", n: "Le temps bégaie", t: "Le Chronolabo a avalé une seconde de travers. Le temps bé… bé… bégaie. Personne ne sait ce qui va se passer. Ni quand. Ni combien de fois." },

  /* ---------- Ère 7 : l’Ère stellaire ---------- */
  { e: 7, k: "gain", n: "Supernova d’occasion", t: "Une supernova d’occasion explose dans la cour. Le service après-vente s’excuse et laisse les débris : des tonnes de molécules lourdes." },
  { e: 7, k: "gain", n: "Kévin vendu aux touristes", t: "Des touristes de Véga achètent toute la boutique de souvenirs, y compris Kévin. On rachète Kévin. Il reste un joli bénéfice." },
  { e: 7, k: "buff", n: "Une étoile amoureuse", t: "Une étoile captive tombe amoureuse du labo et brille de toutes ses forces pour l’impressionner. La forge en profite. Ne lui dites rien." },
  { e: 7, k: "buff", n: "Le chant des étoiles", t: "Les étoiles captives de la forge entonnent un chant de travail. C’est faux, mais terriblement motivant. Les cadences s’envolent." },
  { e: 7, k: "click", n: "Poussière d’étoile sur la fiole", t: "Kévin a saupoudré la fiole de poussière d’étoile. Chaque clic déclenche une minuscule éruption solaire. Évitez de vous gratter le nez." },
  { e: 7, k: "click", n: "La Grande Pipette s’en mêle", t: "Les astronomes baptisent une constellation « la Grande Pipette ». Flattée, elle vient cliquer sur la fiole avec vous, depuis le ciel." },
  { e: 7, k: "free", n: "Soldes de la Voie lactée", t: "La Voie lactée fait ses soldes de fin de cycle. Le labo repart avec des forges entières, offertes pour l’achat d’une nébuleuse." },
  { e: 7, k: "free", n: "Le Crabe se reconvertit", t: "La nébuleuse du Crabe, lassée d’être un crabe, se reconvertit en zone industrielle et rejoint le labo avec tout son matériel." },
  { e: 7, k: "gold", n: "Dent en or stellaire", t: "Une naine blanche perd une dent en or en heurtant la forge. La dent a la forme d’une fiole. Elle ne la réclamera pas : elle a honte." },
  { e: 7, k: "gold", n: "La boucle d’oreille du Soleil", t: "En se recoiffant, le Soleil perd une boucle d’oreille dorée en forme de fiole. Elle atterrit pile dans la cour du labo." },
  { e: 7, k: "storm", n: "Une nébuleuse éternue", t: "Une nébuleuse a éternué. Des milliers d’étoiles filantes en forme de fiole s’abattent sur le labo. Faites un vœu, puis attrapez-les !" },
  { e: 7, k: "chaos", n: "Crise de milieu de vie", t: "Le Soleil traverse sa crise des cinq milliards d’années. Il s’achète une couronne neuve, se teint en bleu et dérègle tout. Attention !" },
  { e: 7, k: "chaos", n: "Étoile à neutrons égarée", t: "Kévin a égaré une étoile à neutrons dans la salle de pause. Elle déforme tout autour d’elle, à commencer par les règles du jeu." },

  /* ---------- Ère 8 : l’Ère cosmique ---------- */
  { e: 8, k: "gain", n: "Univers en vrac", t: "Le simulateur génère par erreur un univers entièrement fait de molécules. On le vide dans la réserve. Il y avait aussi un canapé." },
  { e: 8, k: "gain", n: "Héritage d’un vieil univers", t: "Un vieil univers s’éteint et lègue tout son patrimoine au labo. Le notaire, un trou noir, a déjà prélevé sa part." },
  { e: 8, k: "buff", n: "La molette de la gravité", t: "Kévin a tourné la molette de la constante gravitationnelle « juste d’un cran ». Tout le labo produit plus vite. Plus personne n’y touche." },
  { b: "cerveau", e: 8, k: "buff", n: "Le Cerveau a une idée", t: "Le Cerveau galactique a enfin eu une idée. Il refuse de dire laquelle, mais tout le labo accélère par respect." },
  { e: 8, k: "click", n: "Le Grand Attracteur craque", t: "Le Grand Attracteur s’est entiché de votre index. Chaque clic attire des molécules depuis tout l’univers observable." },
  { e: 8, k: "free", n: "La matière noire se dévoile", t: "La matière noire sort enfin du placard et révèle des bâtiments oubliés. Ils étaient là depuis le début, simplement invisibles." },
  { e: 8, k: "gold", n: "Pi en or", t: "Le simulateur découvre une version dorée de pi, légèrement plus ronde. Elle est mise en fiole par précaution. Ne la renversez pas." },
  { e: 8, k: "gold", n: "La monnaie du Big Bang", t: "Le Big Bang avait gardé la monnaie : au fond de l’univers, une fiole dorée et son ticket de caisse, daté d’avant le temps." },
  { e: 8, k: "storm", n: "Averse de quarks", t: "Météo cosmique : averse de quarks en mini-fioles sur tout le labo. Saveurs : haut, bas, charme et « fraise des bois »." },
  { e: 8, k: "storm", n: "Trou de ver débouché", t: "Un trou de ver bouché se débouche d’un coup, comme un évier, et recrache des milliers de mini-fioles sur le labo. Ventouse offerte." },
  { e: 8, k: "chaos", n: "Erreur 404 : univers", t: "ERREUR 404 : univers introuvable. Il redémarre en mode sans échec. Certaines lois de la physique risquent de manquer à l’appel." },
  { e: 8, k: "chaos", n: "Ctrl+C cosmique", t: "Kévin a copié l’univers et oublié de le coller. L’univers est quelque part dans un presse-papiers. Tout est possible." },
  { e: 8, k: "chaos", n: "Chaises musicales cosmiques", t: "Les constantes fondamentales jouent aux chaises musicales. La vitesse de la lumière s’assoit à la place de la gravité. Ça va secouer." },

  /* ---------- Ère 9 : l’Infini ---------- */
  { e: 9, k: "gain", n: "L’infini plus deux", t: "Le comptable découvre l’infini plus un dans la caisse. On ignore d’où vient le « plus un », mais il est franchement énorme." },
  { e: 9, k: "gain", n: "Mme Duchemin s’excuse", t: "Mme Duchemin retire toutes ses plaintes. L’univers, en état de choc, verse au labo une indemnité colossale en molécules." },
  { e: 9, k: "buff", n: "Récursion en équipe", t: "Le labo qui contient le labo qui contient le labo décide enfin de travailler en équipe. La récursion produit à toute vitesse." },
  { e: 9, k: "buff", n: "Le comité dit oui", t: "Pour la première fois de l’histoire, le comité d’éthique dit « oui ». Le labo, euphorique, produit comme jamais. On ignore à quoi." },
  { e: 9, k: "click", n: "La fiole vous clique", t: "Pour la première fois, la fiole vous clique en retour. Le courant passe entre vous. Vos clics deviennent métaphysiques." },
  { e: 9, k: "click", n: "L’index de l’Infini", t: "L’Infini vous prête son index. Il est très long. Chaque clic touche la fiole dans toutes les réalités à la fois." },
  { e: 9, k: "free", n: "Le Néant construit", t: "Pour se faire pardonner d’exister, le Néant construit des bâtiments au labo. Ils sont faits de rien, mais ils marchent très bien." },
  { e: 9, k: "free", n: "Grinchard capitule", t: "Le Professeur Grinchard s’avoue vaincu et lègue tous ses labos au nôtre. Ils sont en carton, mais l’Infini ne voit pas la différence." },
  { e: 9, k: "gold", n: "Ouvrir en cas d’infini", t: "Au fond du dernier placard de l’univers dort une fiole dorée étiquetée « Ouvrir en cas d’infini ». C’est le cas. Ouvrez." },
  { e: 9, k: "storm", n: "Il pleut des fioles", t: "Le concept de pluie a fusionné avec le concept de fiole. Il pleut des fioles dans toutes les réalités. Prenez un seau infini." },
  { e: 9, k: "storm", n: "Kévin renverse l’Infini", t: "Kévin a renversé l’Infini. Les fioles roulent dans toutes les directions, y compris celles qui n’existent pas. Ramassez !" },
  { e: 9, k: "chaos", n: "Le narrateur démissionne", t: "Le narrateur de ce jeu remet sa démission. Les incidents s’écrivent désormais tout seuls. Celui-ci ne sait pas du tout ce qu’il fait." },
  { e: 9, k: "chaos", n: "Procès en plagiat", t: "La Réalité attaque {labo} pour plagiat. La défense plaide que la Réalité n’existe que parce que le labo l’a bien voulu. Verdict imprévisible." },
  { e: 9, k: "chaos", n: "Le bouton « Annuler »", t: "Kévin a trouvé le bouton « Annuler » de l’univers. Il a appuyé une fois, puis deux, puis il a fait « Rétablir ». On verra bien." },
  { e: 9, k: "chaos", n: "Le jeu se réveille", t: "Le jeu a pris conscience de lui-même. Il vous regarde. Il hésite entre vous aider et vous tester. Croisez les doigts." }
];
