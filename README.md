# Visualisering av GitLab repo

Dette prosjektet inneholder en singlepage-applikasjon for visning av data hentet fra GitLab sitt Rest-API. Det er utviklet i React med TypeScript, i henhold til arbeidskravet.

## Beskrivelse av applikasjonen

Applikasjonen begynner med å spørre brukeren om å legge inn en prosjekt-ID og Access Token fra et GitLab-prosjekt. Man får også muligheten til å huske prosjektet mellom sessions, og bestemme om brukerne skal være anonymiserte. Skriver man inn gyldig informasjon vil man få opp applikasjonens hovedside. Her vises det frem en liste med commits eller issues. Man kan også bestemme å se en kolonne for hver brukers bidrag. Trykker man på filter-knappen oppe i venstre hjørne vil det åpnes en meny. Her kan man velge om man vil se commits eller issues, filtrere på dato og velge hvilke brukere sine bidrag en vil at skal vises. Til slutt kan man også velge om man vil vise dataen som en liste eller en graf. Velger man grafen vil man få opp et linjediagram for commits som viser hver brukers kumulative bidrag, mens issues blir representert som et stolpediagram. Har man lyst å hente informasjon fra et annet prosjekt kan man logge ut ved å trykke på knappen øverst til høyre.

Hele siden er også responsiv ved at sideelementene skalerer og plasserer seg logisk uavhengig av skjerm- eller vindusstørrelse. For eksempel har vi et skalerende bilde av GitLab-logoen, og vi har brukt media-queries til å bestemme om filtreringsmenyen skal dekke hele eller deler av skjermen. Det er også et bevisst valg at filtreringsmenyen ikke alltid vises om man har stor skjerm. Dette er siden listevisningen med kolonner blir bredere om det er mange brukere som har bidratt til prosjektet, og da kan man se mer data samtidig uten å scrolle. Listen med kolonner er heller ikke en mulighet på mindre skjermer.

## Arkitektur og valg

Gruppens ønsker var å ha en fornuftig arkitektur og mappestruktur, både fordi vi ønsker god veldikeholdbarhet og for å gjøre det mer oversiktelig under utvikling. Vi valgte å dele opp prosjektet i flere mindre deler. For eksempel ønsket vi en egen mappe for de to context-instasene våre. I tillegg lagde vi en egen mappe for "sidene" i applikasjonen, som i dette tilfellet er hovedsiden og en innloggingsside. I komponentmappen lagde vi flere undermapper for å gjøre det enklere å navigere. Under ser du de viktigste mapppene i arkitekturen vår.

```
src
├───__snapshots__
├───api
├───components
│   ├───dataViews
│   └───filter
├───context
├───pages
│   │   login.tsx
│   │   mainPage.tsx
├───styles
│   │   theme.tsx
└───utils
```

## Tekniske valg

Under diskuteres noen av de viktigste tekniske valgene som er gjort i prosjektet.

### RestAPI

Vi valgte å bruke Fetch API-et for å hente data fra GitLab da det er en del av JavaScript. Dataen blir hentet ved oppstart, hver gang man endrer på filtreringsdatoene, eller bytter mellom commits og issues. Dette skjer ved hjelp av useEffect-hooken. Ettersom det kan være svært mange commits eller issues i et prosjekt, og det er en begrensning i GitLab sitt API til hvor mange man kan hente om gangen, henter vi dataene rekursivt til det ikke er mer ny data å hente.

### Styling av UI

For styling av UI valgte vi å bruke [Material UI](https://mui.com/) som base sammen med [styled-components](https://styled-components.com/) for custom styling og overskriving av styles. Styled-components gir muligheten til å skrive vanlig CSS og bruke avanserte CSS-selektorer i komponentene. I tillegg kan man sende inn props for betinget styling.

I tillegg har vi tatt i bruk [Framer motion](https://www.framer.com/motion/) for animering av elementer. Vi valgte å bruke dette da det er enkelt å lager mer komplekse animasjoner uten å måtte skrive mye CSS. I tillegg er det JavaScript-basert, noe som gjør at man har mer kontroll.

### Visning av data

Vi valgte å bruke [react-chartjs-2](https://www.npmjs.com/package/react-chartjs-2) for å vise graf og stolpediagram fordi dette gir enkel implementasjon. Vi begynte med å bruke [React Frappe Charts](https://www.npmjs.com/package/react-frappe-charts), men grunnet problemer i implementasjonen av React-wrapperen, valgte vi å bytte til ChartsJS.

### Innlogging

I sammenheng med at vi implementerte innlogging valgte vi å også implementere [react-router-dom](https://www.npmjs.com/package/react-router-dom) for å kunne sende brukeren til en egen innloggingsside og ikke som en popup.

### Session- og local storage

Dato-filter lagres i session-storage, mens kategori lagres i local storage. Dette kun for å vise bruk av begge metodene for lokal lagring.

Innloggingsinformasjon lagres i local storage dersom brukeren huker av for "husk meg" og session storage om den ikke velger husk meg. Denne informasjonen fjernes fra local/session storage når brukeren logger ut, sammen med all brukerdata som er lagret i local/session storage.

## Testing

### Jest

- [jest-dom](https://testing-library.com/docs/ecosystem-jest-dom/)
- [@testing-library/user-event](https://testing-library.com/docs/ecosystem-user-event/)

Tester om listevisning eller grafvisning er valgt. For å oppdatere context-verdiene som hentes ut og benyttes i mainContentContainer, er det nødvendig å wrappe mainContentContainer inni FilterContext.Provider slik at man kan endre på context-staten før testen kjøres. I begge testene benyttes det API-kall. Disse mockes, slik at man kun tester komponenten og ikke om API-kallet og håndteringen av koden der er korrekt. Dette ville vært mer naturlig å gjøre i en egen test. For å unngå problemer med canvas som skal tegnes opp i testen, mockes også grafen, slik at det ikke oppstår problemer der.

### Testing av brukergrensesnitt

Vi har testet brukergrensesnittet på tre forskjellige enheter: en mobil, en stasjonær PC med 27-tommers skjerm og på den innebygde skjermen til en laptop.

#### Mobil

Spesifikasjoner: Motorola One, 1520x720 og 5,9 tommer

På mobiltelefonen fungerer hele siden som den skal. Filtreringsmenyen dekker hele skjermen og kan åpnes og lukkes både ved å trykke på filterknappen og 'swipe' fra venstre side av skjermen. Ellers skaleres alle lister, bilder og grafer til skjermens størrelse. Dette gjelder både horisontal og vertikal orientering, og det er en sømløs overgang mellom de to orienteringene.

#### Stasjonær PC

Spesifikasjoner: 1920x1080, 27 tommer

På en stasjonær PC med skjerm fungerer også siden optimalt. Alle elementene plasseres fint og har fornuftige størrelser. Filtreringsmenyen dekker en fornuftig mengde av skjermen og kan lukkes ved å trykke utenfor menyen.

#### Laptop

Spesifikasjoner: 1366x768, 15,6 tommer

På laptopen fungerer også nettsiden som den skal. Flere av elementene, som filtreringsmenyen og listevisningen, dekker en større del av skjermen enn de gjør for PC-en med større skjerm. Likevel får alle elementene plass uten å dekke over hverandre, eller gi unødvendig horisontal scrolling for å få plass til alle elementene.

Vi testet også at sideelementene plasserer og skalerer seg korrekt ved variabel størrelse på nettleservinduet. Dett testet vi både ved å direkte endre størrelsen på vinduet, og ved å bruke Google Chrome sine utviklerverktøy for simulering av ulike enheters skjermstørrelser og testing av responsivt design. I alle tilfellene vi testet har brukergrensesnittet oppført seg som forventet.
