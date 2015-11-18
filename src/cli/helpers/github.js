import 'source-map-support/register';

import request from 'request';
import tar from 'tar';
import zlib from 'zlib';

export function getVersions(packageName) {
    return new Promise((resolve, reject) => {
        request({
            url: `https://api.github.com/repos/${packageName}/tags`,
            headers: {
                'User-Agent': 'request'
            }
        }, (error, resp, body) => {
            if (error) {
                return reject(error);
            }

            if (resp.statusCode !== 200) {
                return reject(new Error(packageName + ': returned ' + resp.statusCode + '\n\nbody:\n' + body));
            }

            return resolve(JSON.parse(body));
        });
    });
}

export function get(packageName, version = 'master') {
    return new Promise((resolve, reject) => {
        /* eslint-disable new-cap */
        const writeTar = tar.Extract({strip: 1, path: process.cwd()});
        /* eslint-enable */

        writeTar.on('finish', resolve);

        request
            .get(`http://github.com/${packageName}/tarball/${version}`)
            .on('error', reject)
            .pipe(zlib.createGunzip())
            .on('error', reject)
            .pipe(writeTar)
            .on('error', reject);
    });
}
