export type ConfigUploads = {
    pdfPaths: string[],
    txtPaths: string[],
    links: string[]
}

export type ConfigDataStructure = {
    projectName: string,
    data: ConfigUploads
}