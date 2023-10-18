import { ConfigDataStructure, CommonConfigDataStructure } from "common/interfaces/project-assistant-dto";

export const fiveSControlConfig: ConfigDataStructure = {
    projectName: '5s Control',
    data: {
        pdfPaths: ['./src/uploads/projects/with-config/projects/5s-control/files/lean.pdf'],
        txtPaths: [
            './src/uploads/projects/with-config/projects/5s-control/files/one.txt',
            './src/uploads/projects/with-config/projects/5s-control/files/two.txt',
        ],
        links: [
            'https://5controls.com/',
            'https://www.viact.ai/manufacturing',
            'https://www.staqu.com/solutions/manufacturing/',
            'https://datenwissen.com/', 
            'https://mcmarvin.com/Manufacturing-Facility.html',
            'https://www.cherrylabs.ai/'
            ]
    }
}





// VVVVVVVVVV IN PROGRES!! use fiveSControlConfig

export const commonConfig: CommonConfigDataStructure[] = [
    {
        projectName: '5s Control',
        behaviourTemplate: `analize this information: {context}, and answer questions: {question}`,
        extraInfoForChatPath: './src/uploads/projects/with-config/projects/5s-control/files',
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
        youtubeVideoLinks: ['https://www.youtube.com/watch?v=0j1ZSvxvMPE'],
        gitHubRepositories: [
            {
                link: 'https://github.com/easably/EnglishCards.git',
                branch: 'main'
            }
        ],
        figmaProject: []
    }
] 