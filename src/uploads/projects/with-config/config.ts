import { ConfigDataStructure, CommonConfigDataStructure } from "common/interfaces/project-assistant-dto";


// VVVVVVVVVV DEPRICATED!! use CommonControlConfig

export const fiveSControlConfig: ConfigDataStructure = {
    projectName: '5s Control',
    infoForChatGuru: {
        pdfPaths: [
          //  './src/uploads/projects/with-config/projects/5s-control/files/lean.pdf'
        ],
        txtPaths: [
           // './src/uploads/projects/with-config/projects/5s-control/files/one.txt',
            //'./src/uploads/projects/with-config/projects/5s-control/files/two.txt',
        ],
        youTubeLinks: ['https://www.youtube.com/watch?v=hYEhSl2ziBc'],
        links: ['https://www.youtube.com/watch?v=hYEhSl2ziBc'],
        // ['https://marbad.pl/', 'https://www.nieruchomosci.aia.pl/', 'https://www.metalklaster.pl/', 'https://www.fotele.com/', 'https://www.staubli.com/pl-pl/', 'https://lockhard.pl/', 'https://www.eldar.biz/', 'https://olafltd.pl/', 'https://mitegra.pl/', 'https://www.7bar.pl/', 'https://aoexpert.com.pl/', 'https://www.polkont.pl/', 'https://www.keyence.eu/', 'https://www.avalon-machines.pl/', 'https://www.wittenstein.de/', 'https://wiresolutions.pl/', 'https://lukasiewicz.gov.pl/', 'https://www.tms.pl/kantor', 'https://www.label.pl/', 'https://www.arkance-systems.pl/', 'https://aleo.com/pl/firma/wielobranzowe-przedsiebiorstwo-sigma-sp-z-o-o-kostrzyn-wlkp', 'https://www.imaschelling.com/pl/', 'https://www.iotsolution.pl/', 'https://waites.net/', 'https://www.relpol.pl/', 'https://proof-steel.pl/', 'https://sympower.net/', 'https://www.fischerpolska.pl/pl-pl/', 'https://mutech.pl/', 'https://heisslufttechnik.pl/', 'https://regnator.com/', 'http://tng-air.com.pl/', 'https://wkpoland.com/kontakt/', 'https://www.romanian-companies.eu/profesional-f.g.company-srl-1809086/', 'https://hart-tech.pl/', 'https://www.bosmal.com.pl/', 'https://www.isafe-mobile.com/en/', 'https://optlasers.com/', 'https://www.baumer.com/pl/pl/', 'http://www.anim.com.pl/', 'https://www.wago.com/pl/polska', 'https://www.otec.de/de/', 'https://www.itbcgroup.pl/', 'https://www.tele-radio.com/pl/', 'https://ftsolutions.info.pl/', 'https://www.flexlink.com/pl/home/', 'https://nowoczesny-przemysl.pl/', 'https://mdlabels.pl/', 'https://pgcnc.pl/', 'https://www.bogmar.net.pl/', 'https://aks.dk/', 'https://aiq-robotics.com/?page_id=2607', 'https://dbr77.com/', 'https://www.ksse.com.pl/o-ksse-1', 'https://elmetal.pl/', 'https://www.newtech.com.pl/', 'https://gamart.pl/', 'https://www.schmalz.pl/', 'https://www.rohde-schwarz.com/pl/home_48230.html', 'https://www.hikvision.com/pl/', 'http://www.trodat.pl', 'https://www.pepperl-fuchs.com', 'https://www.orange.pl/dane_firmowe_Orange.phtml', 'http://avanti-tools.com.pl/', 'http://www.pf-electronic.pl/', 'https://www.rollon.com/PL/pl/', 'http://www.fatek.pl/home', 'https://www.idsol.eu/', 'http://www.hautec.com.pl/#hautec', 'https://www.rb-poland.com/?page_id=7&lang=pl', 'https://www.octant.pl/', 'https://abisoft.xyz/', 'https://www.tidk.pl/pl/', 'https://www.fif.com.pl/pl/content/15-o-firmie', 'https://cimco.pl/', 'https://www.dalmec.com/pl/contact/', 'https://omegasystem.pl/?gclid=EAIaIQobChMI6qPpx6SU-gIVCQd7Ch330AxYEAAYASAAEgKXqfD_BwE', 'https://corobotics.pl/', 'https://stmech.eu/kontakt/', 'https://poznanskaksiegowosc.pl/', 'https://connectorio.com/pl/platforma-przemyslowy-iot-cloud-bms/', 'https://haiko.pl/', 'https://www.mondial.it/it/contatti', 'https://contexexperts.eu/en/home-en/', 'https://www.ylm.pl/', 'https://aleo.com/pl/firma/fundacja-wektor-wiedzy-wsparcie-innowacji-rzeszow', 'https://www.dnb.com/business-directory/company-profiles.due_consulting_sp_z_o_o.af5d85742b76153d945f3dc5bf01ce55.html', 'https://astat.pl/', 'https://www.norres.com/pl/home/', 'https://jb.biz.pl/', 'https://www.tauron.pl/dla-domu', 'https://ulamex.com.pl/', 'https://www.bardusch.com/pl/pl/dane.html', 'https://emerson.pl/', 'http://cnc-projekt.pl/', 'https://infinitesolar.pl/', 'https://www.elesa-ganter.pl', 'https://www.egsystem.pl/', 'https://www.b4s.pl/', 'https://poland.arcelormittal.com/', 'https://www.cloos.pl/', 'https://www.weidmuller.pl/pl/', 'https://www.orionht.pl/', 'https://www.turck.pl/pl/', 'https://cnc.shop.pl/', 'https://voytechpolska.com/', 'https://jazon.com.pl/', 'https://mapa.targeo.pl/6631829834/nip/firma', 'https://tfc.eu.com/', 'https://conec.com/pl/', 'https://www.beckhoff.com/pl-pl/', 'https://www.kabeltech.pl/', 'https://stahlwille.pl/', 'https://www.ikont.eu/en/', 'https://kabelschlepp.pl/pl/firma/kontakt/index.html', 'https://lapppoland.lappgroup.com/', 'https://merawex.com.pl/pl/', 'https://www.acs-systems.pl/', 'https://aserto.pl/', 'https://www.madora.net.pl/', 'https://www.wolmal.pl/', 'http://sdmgroup.pl/', 'http://www.timatesystem.com/', 'https://www.haleprzemyslowe.plus/', 'https://www.gazex.com/', 'https://dhc.pl/', 'https://www.kreativ-kollekt.de/', 'https://topzal.com.pl/szlifierki-tasmowe-scantool', 'https://www.theusled.com/', 'http://www.contra-polska.pl/kontakt.html', 'https://ajancnc.com/en-us/index.php', 'https://www.flaser.pl/', 'http://piazap.com.pl/', 'https://www.mcmproject.com.pl/', 'https://www.autorobotstrefa.pl/kontakt', 'https://www.hellermanntyton.pl/', 'https://elplc.com/', 'https://stc-steyr.com/home', 'https://www.filmat.eu/', 'https://www.makita.pl/', 'https://www.pekao.com.pl/', 'https://www.cherbsloeh.pl/', 'https://www.gudepol.com.pl/', 'https://www.findernet.com/pl/polska/', 'https://www.edu4industry.com/o-nas/', 'https://geotronics.com.pl/', 'https://www.tkd-kabel.de/pl/', 'https://www.technical.pl/', 'https://coleman.pl/', 'https://pik-instruments.pl/', 'http://www.vendorobotics.com/', 'https://lasitlaser.pl/', 'https://www.energyon.pl/', 'https://pl.linkedin.com/company/gh-cranes-polska', 'https://stomilex.pl/o-firmie/', 'http://www.fpg.com.pl/', 'https://ecoline.com.pl/', 'https://www.pro-control.pl/', 'https://vikinglighting.com/en/durable/', 'https://virtuslab.com/contact/', 'http://krs.infoveriti.pl/K2robots', 'https://www.kuebler.com/pl/home#', 'https://polcom.com.pl/', 'https://www.oemautomatic.pl/', 'https://arsys.com.pl/', 'https://silvan-logistics.com/', 'https://flussmann.com/pl/strona-glowna/', 'https://znicro.com.pl/', 'https://www.brovindvibratori.it/', 'https://szatkowski.pl/', 'https://oakfusion.com/', 'https://www.gsmt.pl/', 'https://zgoda.pl/', 'https://www.solbergmfg.com/en', 'http://www.degson.de/en/index.html', 'https://general-id.pl/', 'https://www.eurobox.pl/polityka-prywatnosci.html', 'http://d-tech.com.pl/firma/', 'https://3druktronik.com/', 'https://k-cubed.pl/', 'https://www.ige-xao.com/pl/', 'https://aiut.com/', 'https://smart.biznesbutik.pl/b/', 'https://edutech.expert/', 'https://www.eta.it/sito/', 'https://znakowarki.com/', 'https://letterbender.net/', 'https://admgroup.pl/', 'http://nm-d.pl/', 'https://www.metalwork.pl/', 'https://pl.trotec.com/shop/?rc=bcec203717&gclid=EAIaIQobChMIg4-A-pHj9QIVDcgYCh16BwFkEAAYASAAEgKxk_D_BwE', 'http://www.asfi.pl/pl/', 'https://www.sigmasa.pl/', 'https://www.tt-cs.com.pl/', 'https://www.piab.com/pl-PL/', 'https://www.epson.pl/legal/designation', 'https://smartlaser.pl/', 'https://www.hangon.com/pl/', 'https://www.fath24.com/', 'https://techspaw.com.pl/', 'https://domowesanatorium.pl/', 'https://www.gfps.com/pl-pl.html', 'http://mcs-techno.pl/kontakt/', 'http://softli.pl/', 'https://sklep.akcesoria-cnc.pl/', 'https://www.admel.com.pl/', 'https://www.semicon.com.pl/home?gclid=EAIaIQobChMIiaHLsrKM7gIVjh4YCh15Ag57EAAYASAAEgL4AvD_BwE', 'https://laserignis.com/index.php/pl/', 'https://www.totalmateria.com/page.aspx?ID=Home&LN=PL', 'https://www.euroimpianti.pl/', 'https://teamtechnik.pl/', 'https://www.folpol.pl/pl/', 'https://www.apar.pl/pl.html', 'http://relopack.com/', 'https://www.apra-optinet.pl/', 'https://jotkel.com/', 'https://www.brady.pl/', 'http://czyszczeniespoin.pl/', 'https://3dgence.com/pl/', 'https://malow.com.pl/kontakt/', 'https://www.pw.edu.pl/', 'https://zjg.com.pl/', 'https://lak-serwis.pl/kontakt/', 'http://www.artexit.pl/pl/czytaj/10/0/o-firmie', 'https://www.backer.pl/start/', 'https://akonda.pl/', 'https://www.automatech.pl/', 'https://ateq.pl/', 'https://klimawent.com.pl/en/home-2/', 'https://www.chiorino.com.pl/', 'https://www.palmech.eu/', 'https://rgbelektronika.pl/pl/', 'https://www.robotpartner.pl/', 'https://qsense.pl/', 'https://www.pneumat.com.pl/', 'https://pro-assem.pl/', 'https://olsom.net/', 'https://szef-montaz.pl/', 'http://poltechengineering.com/pl/', 'http://www.esdprotect.pl/kontakt/', 'http://www.konwektor.pl/', 'https://brainstorm.biz.pl/o-firmie', 'https://pa-nova.com.pl/', 'https://www.intelo.pl/', 'https://galeriakonopi.pl/', 'https://arp.pl/', 'https://www.hubs.com/', 'https://rondo2.pl/', 'https://en.ktu.edu/', 'https://www.tme.eu/pl/', 'https://ultrarobotics.pl/', 'https://www.sf-filter.com/pl/start.htm', 'https://www.mynorcan.pl/', 'https://www.viverno.pl/pl/o-nas', 'https://essemtec.com/en/', 'https://amgautomatyka.pl/', 'https://www.captron.pl/', 'https://airtecsolutions.pl/', 'https://www.neu-jkf.pl/', 'https://www.boplan.com/de', 'https://envibra.pl/', 'https://www.aste.pl/', 'http://www.keller-druck.com.pl/', 'https://guenther.com.pl/', 'https://www.facebook.com/zafini.solutions/photos/?tab=albums', 'https://vervo.pl/', 'https://leica-geosystems.com/pl-pl', 'https://eurelo.pl/', 'https://ke.pl/', 'https://powerrubber.com/', 'https://wdx.pl/', 'https://www.electroclass.com/pl/', 'https://wobit.com.pl/', 'http://punktdrukarnia.pl/', 'https://opteam.pl/', 'https://www.bacpolska.pl/', 'https://www.fronius.com/pl-pl/poland', 'http://meta-vulk.hu/', 'https://www.teknosystem.com.pl/', 'https://rena-pol.pl/', 'http://www.invertekdrives.com.pl/', 'https://apautomatyka.pl/', 'https://aleo.com/pl/firma/lavi-tech-izabella-potrapeluk-paslek', 'https://www.innovaphone.com/de', 'http://mercator.com.pl/', 'https://aea-technique.pl/', 'https://www.lenze.com/pl-pl/', 'https://www.tlc.pl/kontakt/', 'https://automa.net/', 'https://globalenergy.com.pl', 'https://evoltec.pl/o-firmie/', 'https://www.euchner.de/en-us/', 'https://www.igus.pl/', 'https://www.leuze.com/en/united_kingdom/fehler_uk/404.php', 'https://e-waeller.pl/', 'https://wamex.com.pl/', 'https://sulichrec.pl/', 'https://www.astor.com.pl/', 'https://www.norelem.pl/pl/pl/Home.html', 'https://nis.com.pl/', 'https://centrummaszyncnc.pl/', 'https://helukabel.pl/', 'https://www.comparta.pl/', 'https://www.kipp.pl/pl/pl/Strona-g%C5%82%C3%B3wna.html', 'https://www.weintek.com/globalw/Default.aspx', 'https://eagle-group.eu/pl', 'https://raxy.pl/', 'https://auer.com.pl/', 'https://www.limathermsensor.pl/', 'https://layher.pl/', 'https://przemyslprzyszlosci.gov.pl/kontakt/', 'https://www.drafteam.pl/', 'https://www.shmega.com/', 'https://topzal.com.pl/', 'https://forbox.pl/', 'https://grupamarat.pl/kontakt/', 'https://veloxalpha.com/', 'https://www.smartwork.pl/', 'https://stabilis.io/pl/', 'https://automatykaonline.pl/Automatyka', 'https://www.vitronic.com/pl/corporate-home', 'https://get3d.pl/', 'https://www.elmark.com.pl/', 'https://www.fabrico.io/en/', 'https://avicon.pl/', 'https://s4tech.pl/', 'https://www.biznesfinder.pl/wronki-izomet-przedsiebiorstwo-produkcyjne-piotr-kurowski-2430733.html', 'https://www.merazet.pl/', 'https://www.multiprojekt.pl/', 'https://handy-fix.com.pl/', 'https://3dphoenix.pl', 'https://caiote.io/pl/main-page/', 'https://alf-sensor.pl/', 'http://invenco.pl/', 'https://www.dacpol.eu/', 'https://stovaris.pl/', 'https://maszyny-polskie.pl/']
    }
}


export const commonConfig: CommonConfigDataStructure[] = [
    {
        projectName: '5s Control',
        behaviourTemplate: `analize this information: {context}, and answer questions: {question}`,
        extraInfoForChatPath: '', //'./src/uploads/projects/with-config/projects/5s-control/files',
        websitesLinks: [
            {
                link: 'https://5controls.com/',
                crawlDepth: 5,
            },
            {
                link: 'https://www.viact.ai/manufacturing',
                crawlDepth: 2,
            },
            {
                link: 'https://www.staqu.com/solutions/manufacturing/',
                crawlDepth: 2,
            },
            {
                link: 'https://datenwissen.com/',
                crawlDepth: 2,
            },
            {
                link: 'https://mcmarvin.com/Manufacturing-Facility.html',
                crawlDepth: 2,
            },
            {
                link: 'https://www.cherrylabs.ai/',
                crawlDepth: 2,
            },
        ],
        youtubeVideoLinks: [
           // 'https://www.youtube.com/watch?v=0j1ZSvxvMPE'
        ],
        gitHubRepositories: [
            {
                link: 'https://github.com/easably/Basic-English-850-words',
                branch: 'master'
            }
        ],
        figmaProject: []
    }
] 