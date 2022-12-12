export const profilePageSelectors =
{
    reposCount: 'div.width-full [data-tab-item="repositories"] span',
    repoButton: 'div.width-full [data-tab-item="repositories"]',
    repoSearchButton: '#your-repos-filter',
    repoPageLink: 'a[href="/{0}/{1}"]',
    projectsPageButton: 'div.width-full [data-tab-item="projects"]',
    projectsInfoSection: '#memexes-results',
    newProjectText: 'Create a new project',
    numberOfProjectsRegx: /[0-9]+ Open/i,
}