import { ConfigDataStructure } from "common/interfaces/project-assistant-dto";

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