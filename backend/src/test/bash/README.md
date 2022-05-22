# testy integracyjne

* **TL;DR**

	tester - wykonuje testy z poziomu żądań HTTP i porównuje je ze wzorcowymi odpowiedziami.

* **URUCHAMIANIE**

		. setup

		. sin (nazwa użytkownika) (hasło)

		tester

	**UWAGA**: po kropce **MUSI** znajdować się spacja.

* **INTRO**

	w tym folderze znajdują się wszystkie skrypty, które obsługują zdefiniowane w springu endpointu z poziomu linii poleceń - dzięki temu testujemy jak backend obsługuje żądania HTTP.
	Na początku każdego skryptu znajduje się opis, jak wywołać dany skrypt, co robi dane wywołanie, ew. todo dla każdego skryptu.
	NIE NALEŻY WYWOŁYWAĆ INACZEJ SKRYPTÓW NIŻ PRZEDSTAWIONO W OPISIE BO INACZEJ KOMPUTER WYBUCHA.

	no, prawie.

	skrypty mają pewne zabezpieczenia na złe wywołania, ale 99,(9)% z nich została napisana w ~5h, na dodatek w godzinach nocnych, 
	więc przy złym wywołaniu jest możliwość uzyskania niepoprawnego żądania bez żadnego komunikatu błędu. 

	Na chwilę obecną skrypt *tester* nie przerywa integracji wchodzącej w skład GitHub Actions, co zostanie w niedługiej przyszłości zmienione. Przyczyna tego jest prosta - 
	Póki co zdefiniowane 4 testy, na których serwer zwraca odpowiedź 500 Internal Server Error; przerwanie integracji wstrzymałoby pracy całego zespołu, więc dopóki błędy
	te nie zostaną naprawione, nie zostanie to dodane. (na przyszłość: wystarczy dodać w YAML'u if [[ $? == 1 ]]; then exit 1; fi po komendzie tester, i poprawić if'a z logami w tester).

* **STRUKTURA PLIKÓW**

	Istotne są 4 foldery:

	* *tests*:

	W tym folderze znajdują się wykonywane testy. 
	Jako wynik testu traktowane jest standardowe wyjście testu, które jest zapisywane - testy mają formę skryptów Basha, jednak przy ich wykonywaniu jest przygotowane całe środowisko, i można wygodnie korzystać ze skryptów.
	Pliki mogą mieć (prawie) dowolne nazwy, aby tylko z sensem - wszystkie pliki znajdujące się w tym folderze zostaną wykonane.

	* *resps*:

	[skrót od resp(onse)s] W tym folderze znajdują się żądane wyniki testów - każdy z plików powinien mieć odpowiadający test o identycznej nazwie pliku w katalogu *tests*.

	* *scripts*:

	Większość skryptów, która odwalają potrzebną robotę. Opis działania i możliwe wywołania znajdują się w sekcji SKRYPTY.

	* *cache*:

	Tymczasowe wyniki skryptów do plików - między innymi zapisywane są tu: dane użytkownika potrzebne do logowania, odpowiedzi serwera, itd.

	Poza tymi folderami istotne są jeszcze skrypty *setup* oraz *sin*.

	* setup:

	Ten skrypt ustawia znaczącą większość środowiska potrzebną do wykonywania testów integracyjnych, ale ręcznie (z linii poleceń) - np. ustawia prawa wykonywania na skryptach,
	tworzy funkcje upraszczające wywoływanie poszczególnych skryptów.

	* sin:

	[skrót od s(ign)in] Loguje danego użytkownika - ze względów technicznych nie można było nazwać ten skrypt in.

	Poza tym, znajdują się też mniej istotne rzeczy, takie jak:

	* folder *outputs*:

	otrzymane wyniki testów - sprawdzane jest, czy każdy z tych plików jest zgodny z plikiem o identycznej nazwie z folderu *resps*.

	* logs:

	plik, w którym zapisana jest zapisane wyjście skryptu *tester* do analizy poza działaniem testów. 

* **SKRYPTY**

	* *tester*:

	wywołanie:

		tester				- uruchamia całą procedurę testera;

		tester debug			- uruchamia testera bez porównania z katalogiem *resps*, generuje katalog *outputs*;

		tester enable			- identyczne do wywołania `tester`, lepsza przejrzystość w YAML'u;

		tester disable			- wyłącza testera, przydatne do określenia w YAML'u.

	Sprawdza zgodność nazw plików *resps* z *tests*; wykonuje wszystkie testy zdefiniowane w *tests*; zapisuje ich wynik do odpowiednich plików w katalogu *outputs*; porównuje wynik każdego
	testu z *outputs* z wzorcowym plikiem z *resps*; wypisuje wszystkie nieudane testy.

	* *setup*:

 	wywołanie:

		. setup

		source setup

	Ustawia środowisko w powłoce potrzebne do wykonywania testów - definiuje funkcje, dzięki którym można korzystać ze skryptów get, put, itd. jak z wbudowanych komend powłoki, stąd potrzebne
	jest jego source'owanie do poprawnego działania. Dodatkowo, ustawia prawa wykonywania na wszystkich potrzebnych skryptach.
	**UWAGA**: definicje powyższych funkcji zakładają, że komendy są wykonywane z poziomu katalogu bash.

	* *sin*:

 	wywołanie:           

		. in {username} {password}  		- loguje się odpowiednimi danymi.

 		source in {username} {password}		-          - || -

 	skrót od s(ign)in
 	[ bo in nie może być nazwą funkcji >:( ]

 	ostatni poprawnie wyłuskany token jest zapisany w pliku "token" w formacie ASCII

	Loguje się przedstawionymi danymi użytkownika. Z odpowiedzi serwera wyciąga token JWT, zapisuje go do zmiennej `token`, po czym go eksportuje; stąd, do poprawnego działania potrzebne jest
	source'owanie tego skryptu.

	* *get*:

	wywołanie:

 		get one task  			- pobiera pierwsze zadanie z otrzymanego JSON'a

 		get task      			- pobiera wszystkie taski z bazy

 		get task {id}			- pobiera taski {id}

 		get id from file {file} 	- wyłuskaj ID z pliku {file};
				  		use case:
				  		post {name} {descr} > response; get id from file response - masz ID nowego zadania

 		get prev id from file {file}  	- wyłuskaj ID pierwszego zadania poprzedzającego z pliku {file}

 		get status from file {file}   	-       ;/

 		get error from file {file}

 	ostatnia otrzymana odpowiedź jest zapisana w pliku "response" w formacie JSON

	Wykonuje żądanie HTTP GET, oraz kilka obudowujących czynności obudowujących te żądanie.

	* *put*:

 	aktualizuje stan zadanie znajdującego się już w bazie.

 	wywołanie:

 		put check {id}				- oznacz zadanie o ID {id} jako wykonane; 

 		put uncheck {id}			- oznacz zadanie o ID {id} jako niewykonane;

 		put prev {id}				- oznacz zadanie czytane ze standardowego wejścia jako poprzednie do zadania o ID {id};

 		put task {id}				- zaktualizuj zadanie o ID {id} czytane ze standardowego wejścia.


	Wykonuje żądanie HTTP PUT, oraz kilka obudowujących czynności obudowujących te żądanie.

	* *post*:

 	wywołanie: 

		post task {name}			- wyślij nowe zadanie o nazwie {name}

		post task {name} {description}		-                - || - 	       i opisie {description}

	w pliku "task" jest zapisany ostatnio wysłane zadanie.


	Wykonuje żądanie HTTP POST, oraz kilka obudowujących czynności obudowujących te żądanie.

	* *del*:

	wywołanie: 

 		del task {id} 				- usuń zadanie {id}

		del prev {id} 				- usuń zadanie określone jako poprzedzające do {id}; jest ono przechowywane w pliku "task".


	Wykonuje żądanie HTTP DELETE, oraz kilka obudowujących czynności obudowujących te żądanie.

	* *up*:

	wywołanie:

		up {username} {password} {email}	- zarejestruj użytkownika o nazwie {username}, haśle {password} i mailu {email}.

	skrót od (sign)up - rejestruje użytkownika

	ostatnio przedstawione dane są zapisane w pliku "credentials" w formacie JSON

	Rejestruje użytkownika o wskazanych danych.

	* *init*:

	wywołanie:

		init users				- wypełnij bazę generycznymi użytkownikami

		init tasks				- wypełnij bazę generycznymi zadaniami


	Wypełnia bazę danych przykładowymi i generycznymi danymi. Póki co jest to: 10 użytkowników user1-10, z hasłem password. Potem dodaje 20 zadań, z losowanym tytułem oraz opisem spośród 7
	nazw i opisów zdefiniiowanych w tym skrypcie.

	* *ubuntu_startup*:

	wywołanie:

		ubuntu_startup

	dużo by pisać :)

	W skrócie: GitHub Actions podczas push'a uruchamia Ubuntu na maszynie wirtualnej na Dockerze na swoim serwerze, na którym to Ubuntu uruchamiany jest kod przedstawiony w YAML'u w 
	.github/workflows/mvn.yml w sekcji run.
	Trzeba skonfigurować Ubuntu, gdyż jest to świeżo zainstalowany system operacyjny, i trzeba między innymi zabawić się w konfigurację Postgresa; 
	inaczej Maven się nie uruchamia. Ten skrypt właśnie wykonuje całą konfigurację Ubuntu. Kiedyś może rozpiszę, dlaczego tak ten skrypt wygląda.

	* *funcs*:

	Definiuje funkcję, która wyciąga dane pole z odpowiedzi serwera i zapisuje są do wskazanego pliku.

infosy dla mnie:

brakuje: skryptu / skryptów obsługujących podzadania, i to boli, bo trzeba pisać lwp-request'y z palca.

jak wykonuje się testy integracyjne? najprościej, czyli w ogóle albo z palca.

edit: NAKAZ KORZYSTANIA Z FUNKCJI ZAMIAST Z ALIASÓW. dlaczego? BO FUNKCJE MOŻESZ EKSPORTOWAĆ. podczas tworzenia subshella aliasy czasem 'giną', a wyeksportowane funkcje nie.

