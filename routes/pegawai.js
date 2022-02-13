var router = require('express').Router();

const { query } = require("../config/db");

function unravel_data_pegawai(req){
    return [req.body.nama,
        req.body.alamat,
        req.body.tempat_lahir,
        req.body.tgl_lahir,
        req.body.status,
        req.body.pendidikan,
        req.body.nama_pasangan,
        req.body.pendidikan_pasangan,
        req.body.pekerjaan_pasangan,
        req.body.jml_anak,
        req.body.nama_anak1,
        req.body.pendidikan_anak1,
        req.body.nama_anak2,
        req.body.pendidikan_anak2,
        req.body.nama_anak3,
        req.body.pendidikan_anak3,
        req.body.nama_anak4,
        req.body.pendidikan_anak4,
        req.body.nama_anak5,
        req.body.pendidikan_anak5
    ]
}

router.get("/", function (req, response) {
    query('SELECT * FROM data_pegawai ORDER by id;').then(result => {
        response.status(200); 
        response.send(result.rows);
    }).catch(e => { 
        console.error(e.stack); 
        response.status(400); 
        response.send(e); 
    });
});

router.get("/:id", function (req, response) {
    query('SELECT * FROM data_pegawai WHERE id = $1;', [req.params.id]).then(result => {
        response.status(200); 
        response.send(result.rows);
    }).catch(e => { 
        console.error(e.stack); 
        response.status(400); 
        response.send(e); 
    });
});

router.put("/:id", function (req, response) {
    params = [req.params.id, ...unravel_data_pegawai(req)]

    query('UPDATE data_pegawai SET nama=$2, '	
        + 'alamat=$3, '	
        + 'tempat_lahir=$4, '
        + 'tgl_lahir=$5, ' 
        + 'status=$6, '
	    + 'pendidikan=$7, '
	    + 'nama_pasangan=$8, '
	    + 'pendidikan_pasangan=$9, '
	    + 'pekerjaan_pasangan=$10, '
	    + 'jml_anak=$11, '
	    + 'nama_anak1=$12, '
	    + 'pendidikan_anak1=$13, '
	    + 'nama_anak2=$14, '
	    + 'pendidikan_anak2=$15, '
	    + 'nama_anak3=$16, '
	    + 'pendidikan_anak3=$17, '
	    + 'nama_anak4=$18, '
	    + 'pendidikan_anak4=$19, '
	    + 'nama_anak5=$20, '
	    + 'pendidikan_anak5=$21 '
        + 'WHERE id = $1;', params)
    .then(result => {
        console.log('Record updated!');
        response.sendStatus(200);
    }).catch(e => { 
        console.error(e.stack); 
        response.status(400); 
        response.send(e); 
    });
});

router.post("/", function (req, response) {
    query('INSERT INTO data_pegawai (nama, alamat, tempat_lahir, tgl_lahir, status, pendidikan, nama_pasangan, pendidikan_pasangan, pekerjaan_pasangan, jml_anak, nama_anak1, pendidikan_anak1, nama_anak2, pendidikan_anak2, nama_anak3, pendidikan_anak3, nama_anak4, pendidikan_anak4, nama_anak5, pendidikan_anak5)'
    + 'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20) RETURNING id;', 
    unravel_data_pegawai(req))
    .then(result => {
        response.send(result.rows);
        response.status(200);
        console.log('Inserted');
    }).catch(e => { 
        console.error(e.stack); 
        response.status(400); 
        response.send(e); 
    });
})

router.delete("/:id", function (req, response) {
    query('DELETE FROM data_pegawai WHERE id = $1;', [req.params.id]).then(result => {
        response.sendStatus(200);
    }).catch(e => { 
        console.error(e.stack); 
        response.status(400); 
        response.send(e); 
    });
})

module.exports = router;